import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Utils from '@/utils/utils';

// Mise en forme du PDF
const colorPrimary = "#15C39A";
const colorSecondary = "#5649A6";
const colorTertiary = "#8A8A8A";
const colorQuaternary = "#C2143D";


export const exportToPDF = (mission, expenses, nature) => {
  const doc = new jsPDF();
  const missionData = mission[0];

  // Titre du document
  // Mise en forme du titre
  doc.setTextColor(colorSecondary);
  doc.setFont("helvetica");
  doc.setFontSize(20);

  // 1er chiffre =  coordonnée x (horizontale), 2nd chiffre =  coordonnée y (verticale) 
  doc.text("Note de frais pour la mission suivante : ", 45, 22);

  // Réinitialisation du style pour le reste du document
  doc.setTextColor(0);
  doc.setFont("times");
  doc.setFontSize(12);


  // Détails de la mission
  doc.text(`Date de début : ${Utils.formatDateTimestampToStr(missionData.start_date)}`, 14, 32);
  doc.text(`Date de fin : ${Utils.formatDateTimestampToStr(missionData.end_date)}`, 14, 38);
  doc.text(`Nature de la mission : ${missionData.nat_mis_name}`, 14, 44);
  doc.text(`Ville de départ : ${missionData.city_dep_name}`, 14, 50);
  doc.text(`Ville d'arrivée : ${missionData.city_arr_name}`, 14, 56);
  doc.text(`Prime : ${Utils.getPrime(missionData, nature)}€`, 14, 62);

  // Tableau des frais
  const expenseTableData = expenses.map(expense => [
    Utils.formatDateTimestampToStr(expense.created_at),
    expense.nat_exp_name,
    `${Utils.formatAmount(expense.amount)}€`
  ]);

  const totalAmount = Utils.formatAmount(expenses.reduce((total, expense) => total + expense.amount, 0));

  doc.autoTable({
    startY: 70,
    head: [['Date', 'Nature des frais', 'Montant']],
    theme: 'grid',
    body: expenseTableData,
    foot: [['', 'Total', `${totalAmount}€`]],
    styles: { fillColor: [255, 255, 255] },
    headStyles: {
      fillColor: [19, 195, 154], // Couleur d'arrière-plan du header
      halign: 'center'
    },
    columnStyles: {
      0: { cellWidth: '30%' },
      1: { cellWidth: '50%' },
      2: { cellWidth: '20%', halign: 'right' },
    },
    footStyles: {
      fillColor: [19, 195, 154] // Couleur d'arrière-plan du footer
    },
    didDrawPage: function (data) {
      // Numéro de page
      doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
    }
  });

  // Enregistrement du PDF
  doc.save(`note-de-frais-${Utils.formatDateTimestampToStr(missionData.start_date)}-${Utils.formatDateTimestampToStr(missionData.end_date)}.pdf`);
}