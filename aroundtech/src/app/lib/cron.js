import cron from 'node-cron'
import { Email } from '@/components/email/email';
import { queryDb } from '@/app/lib/db'
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

/// A 23h
//'0 23 * * *'
/// test
//'* * * * *'
export default cron.schedule('* * * * *', async () => {

	try {

		// Date & Time
		let dateNow = new Date();
		const strTime = `${dateNow.getHours()}h${dateNow.getMinutes()}`;

		// Get Missions
		const queryMissions = await queryDb({
			query: `SELECT mission.id, mission.start_date, mission.end_date, mission.status_id, mission.init_nat_mis_id AS "nat_id_init", 
						status.name AS "stat_name", nature_mission.name AS "nat_name", city_dep.name AS "city_dep", city_arr.name As "city_arr", transport.name As "trans_name"
						FROM mission 
						JOIN status ON status.id = mission.status_id
						JOIN nature_mission ON nature_mission.id = mission.init_nat_mis_id
						JOIN city AS city_dep ON city_dep.id = mission.departure_city_id 
						JOIN city AS city_arr ON city_arr.id = mission.arrival_city_id 
						JOIN transport ON transport.id = mission.transport_id
						WHERE mission.status_id = ?;`,
			params: [5]
		});
		const lstMissionsEnd = queryMissions;

		console.log(`Tâche cron exécutée à ${strTime} :::::::::::::::`);

		let bool_sendmail = false;

		for (let mission of lstMissionsEnd) {

			// Init Mission
			if (mission.status_id == 5) {
				bool_sendmail = true;

				// Set update status
				mission.status_id = 2;

				let queryUpdateMission = await queryDb({
					query: ` UPDATE mission
								SET mission.status_id = ?
								WHERE mission.status_id = ? AND mission.id= ?;`,
					params: [mission.status_id, 5, mission.id]
				});


				if (queryUpdateMission.affectedRows !== 1) {
					console.log("Error cron.schedule", error)
					throw new Error("Erreur dans cron.schedule queryUpdateMission  : " + queryUpdateMission);
				}
			}
		}

		if (bool_sendmail) {
			// Get managers mails
			const queryManagers = await queryDb({
				query: ` SELECT firstname, lastname, email
							FROM user
							WHERE role_id = ?`,
				params: [2]
			});
			const lstManagersMails = queryManagers;

			// Send mail
			if (lstManagersMails.length > 0 && lstMissionsEnd.length > 0) {

				const transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: process.env.MAILER_ADR, // ton adresse gmail
						pass: process.env.MAILER_PWD, // le pwd d'application à récupérer sur gmail
					},
					tls: {
						rejectUnauthorized: false
					}
				});

				///Elastic mail
				/* 				const transporter = nodemailer.createTransport({
									host: "smtp.elasticemail.com",
									port: 2525,
									secure: false, // upgrade later with STARTTLS
									auth: {
										user: ",
										pass: "",
									},
									tls: {
										// do not fail on invalid certs
										rejectUnauthorized: true,
									},
								}); */


				// verify connection configuration
				transporter.verify(function (error, success) {
					if (error) {
						console.log(error);
					}
				});

				const subject = "Gestion des missions : Nouvelle(s) demande(s) de mission";
				const text = "De nouvelles missions sont en attentes de validation";
				const to = lstManagersMails.map(user => user.email).join(",");

				const emailHtml = render(<Email lstMissionsEnd={lstMissionsEnd} />);

				const mess = await transporter.sendMail({
					from: process.env.MAILER_ADR,
					to: to, // list of receivers
					subject: subject,
					text: text,
					html: emailHtml,
				});

			}
		}

	} catch (error) {
		console.log("Error cron.schedule", error)
		throw new Error("Erreur dans cron.schedule " + error);
	}

});