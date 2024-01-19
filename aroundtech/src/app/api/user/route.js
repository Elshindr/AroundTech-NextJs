import { queryDb } from '@/app/lib/db'
import bcrypt from 'bcryptjs';


export async function GET(request) {

    const users = await queryDb({
        query: "SELECT * FROM user",
        params: []
    });
    let datas = JSON.stringify(users);
    //console.log(datas)
    return new Response(datas, { status: 200 });
}


export async function POST(request) {
  if (request.method === 'POST') {
    const body = await request.json();

    const firstname = body.firstname;
    const lastname = body.lastname;
    const email = body.email;
    const password = body.password;
    const role_id = body.role_id;
    const manager_id=body.manager_id;

    try {
      // Vérifiez d'abord si l'e-mail existe déjà dans la base de données
      const existingUser = await queryDb({
        query: "SELECT * FROM `user` WHERE email = ?",
        params: [email],
      });

      if (existingUser.length > 0) {
        return new Response({ error: 'Cet e-mail existe déjà' }, { status: 400 });
      }

      // Si l'e-mail n'existe pas, hashez le mot de passe
      const saltRounds = 10; // Vous pouvez ajuster le nombre de tours selon vos besoins de sécurité
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insérez le nouvel utilisateur dans la base de données avec le mot de passe hashé
      const users = await queryDb({
        query: "INSERT INTO `user` (firstname, lastname, email, password, role_id, manager_id) VALUES (?, ?, ?, ?, ?, ?)",
        params: [firstname, lastname, email, hashedPassword, role_id, manager_id],
      });

      return new Response(users, { status: 200 });
    } catch (error) {
      console.error('Erreur lors de l\'insertion dans la base de données :', error);
      return new Response({ error: 'Erreur lors de l\'insertion dans la base de données' }, { status: 500 });
    }
  } else {
    return new Response({ error: 'Méthode non autorisée' }, { status: 405 });
  }
}

export  async function PUT(request) {
  if (request.method === 'PUT') {
   // console.log(request.body)
    const body = await request.json();
    const id = body.id;
    const firstname = body.firstname;
    const lastname = body.lastname;
    const email = body.email;
    const password = body.password;
    const role_id = body.role_id;

    try {
      // Si l'e-mail n'existe pas, hashez le mot de passe
      const saltRounds = 10; // Vous pouvez ajuster le nombre de tours selon vos besoins de sécurité
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await queryDb({
        query: "UPDATE `user` SET `firstname`= ?,`lastname`= ?,`email`= ?,`password`= ?,`role_id`= ? WHERE id = ?",
        params: [firstname, lastname, email, hashedPassword,role_id, id],
      });

      return new Response(result, { status: 200 });
    } catch (error) {
      console.error('Erreur lors de l\'insertion dans la base de données :', error);
      return new Response({ error: 'Erreur lors de l\'insertion dans la base de données' }, { status: 500 });
    }
  } else {
      return new Response({ error: 'Méthode non autorisée' }, { status: 405 });
  }
}
export async function DELETE(request) {
  console.log(request.body)
    const body = await request.json();
    const id = body.id;


  const users = await queryDb({
      query: `DELETE FROM user 
      WHERE user.id = ?;`,
      params: [id]
  });

  if (users.ok === true) {
      return new Response("IS OKAY", { status: 200 });

  } else {
      return new Response("Erreur DELETE User = " + users.ok, { status: users.status });
  }


} 