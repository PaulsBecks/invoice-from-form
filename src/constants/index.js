export const monthNames = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
];

export const monthNamesLong = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export const primaryColor = "#2c7f83";
export const secondaryColor = "#ffa31a";

export const monochromaticColors = [
  "#0d2223",
  "#123032",
  "#173e40",
  "#1b4d4f",
  "#205b5e",
  "#25696d",
  "#2a787b",
  "#2e868b",
  "#33959a",
  "#37a4a9",
  "#3cb2b8",
  "#44bdc3",
  "#53c3c8",
];

export const blogEntries = [
  {
    id: "0",
    imgSrc: "/img/undraw_add_document_0hek.png",
    title: "Im Handumdrehen Rechnungen anlegen.",
    shortText:
      "So erleichtert Billeroo dir die tägliche Buchhaltung in deinem Verlag.",
    text: `<p>  Rechnungen mit InDesign oder Microsoft Word anzulegen, kann einiges an Zeit kosten. Zum einen müssen Artikel hinzugefügt und die Informationen des Kunden eingetragen, zum anderen Preise ausgerechnet, Rabatte abgezogen und Mehrwertsteuer berechnet werden. <p>

<p>Den Aufwand den man betreibt, um eine einzige Rechnung zu erstellen, kann schnell bei 15 Minuten liegen. Das ist Zeit, die du mit anderen Aufgaben füllen kannst. Zum Beispiel mit wichtiger Kundenakquise, der Gestaltung und Herstellung des nächsten Printproduktes oder Social-Media-Arbeit. </p>
<img src="/img/undraw_quality_time_wiyl.png" alt="Eine Frau läuft mit einem Kind an der Hand."/>

<h2>So hilft Billeroo</h2>

<p>Billeroo hilft dir dabei, genau diese Zeit zu sparen. Mit wenigen Klicks kannst du Rechnungen erstellen, die direkt alle Informationen beinhalten und bereit sind, zum Kunden geschickt zu werden.</p>

<p>Im nächsten Schritt folgt die Buchhaltung. Wenn du Billeroo nutzt, musst  du keine Excel-Tabellen, Google Spreadsheets oder handschriftliche Lagerhaltung mehr führen. In Billeroo findest du übersichtlich alle Informationen, die du sonst mühsam sammelst.</p>

<img src="/img/undraw_online_information_4ui6.png" alt="Eine Frau schaut auf eine Webseite."/>

<h2>Diese Vorteile bietet ein Account</h2>

<p>Erstelle dir einen Account und arbeite mit deinen Kollegen zusammen. Rechnungen müssen nicht mehr hin- und hergeschickt werden. Solltest du einen Termin haben oder krank sein, kann dein Teammitglied einspringen und die gleichen Aufgaben online erledigen.</p>

<p>Billeroo bietet dir also die Möglichkeit, schnell und einfach deine Rechnungen zu erstellen und zu verwalten, und das kostenlos bis zu 20 Rechnungen im Monat. Finde mehr über unsere Preise heraus oder <a href="/invoices/new">erstelle gleich jetzt eine Rechnung.</a></p>

<img src="/img/undraw_collaborators_prrw.png" alt="Zwei Menschen arbeiten miteinander."/>

<p>PS: Dir fehlt eine Funktionalität? Wende dich an unseren Kundensupport und wir werden sie zeitnah implementieren. <a href="mailto:support@billeroo.de">support@billeroo.de</a></p>

`,
  },
  {
    id: "1",
    imgSrc: "/img/undraw_wordpress_utxt.png",
    title: "Billeroo Woocommerce Webhooks",
    shortText: "Automatisiert Rechnungen erstellen mit Billeroo und Wordpress",
    text:
      '<p>Du kannst jetzt noch mehr Zeit sparen, wenn du einen Woocommerce-Shop hast. Billeroo stellt seit dem neuesten Update ein Feature bereit, dass es dir erlaubt Rechnungen automatisch anlegen zu lassen, wenn ein Kunde einen Artikel in deinem Onlineshop kauft.</p>\
<p></p>\
<p>Um Billeroo-Webhooks zu nutzen, kannst du einen neuen Webhook in deinem Billeroo-Profil anlegen und ihn in deinem Woocommerce-Shop hinzufügen. In unseren Blogeinträgen findest du eine <a href="/blog/2"/>detailierte Anleitung</a>. </p>\
<p>Wir übernehmen gerne für dich die Einrichtung. Schicke dafür einfach eine Email an <a href="mailto:service@billeroo.de">service@billeroo.de</a></p>',
  },
  {
    id: "2",
    imgSrc: "/img/woocommerce-new-webhook.png",
    title: "Anleitung: Billeroo-Webhook in Woocommerce anlegen",
    shortText: "So verknüfst du Billeroo und Woocommerce",
    text:
      '<p>Im folgenden werden wir dir erklären wie du deinen Woocommerce-Shop mit Billeroo per Webhook verknüpfen kannst.</p>\
    <p> Zu aller erst musst du einen neuen Webhook in Billeroo erstellen. Hierfür meldest du dich auf Billeroo an und klickst anschließend oben rechts auf deine Emailadresse.</p>\
    <img src="/img/open-profile-modal.png" /> \
    <p> Als nächstes erstellst du einen neuen Webhook in dem du du auf "Webhook anlegen" klickst. </p>\
    <img src="/img/create-new-webhook.png"/>\
    <p>Dir sollte nun die neu erstelle Webhook-URL und das Secret angezeigt werden.</p>\
    <img src="/img/new-webhook.png" />\
    <p>Jetzt wenden wir uns Woocomerce zu. Melde dich auf deiner Wordpressseite ein und navigiere zu den Wocommerce-Einstellungen.</p>\
    <img src="/img/woocommerce-settings.png"/>\
    <p>Wähle den Tab "Erweitert" aus.</p>\
    <img src="/img/woocommerce-settings-advanced.png"/>\
    <p>Im Untermenü wählst du jetzt "Webhooks" aus </p>\
    <img src="/img/woocommerce-settings-webhooks.png" />\
    <p>Dich sollte ein großer "Webhook erstellen" Button begrüßen. Nachdem du auf den Button geklickt hast, wird dir ein Formular angezeigt. Kopiere die Webhook-URL und das Secret in die jeweiligen Felder. Außerdem musst du bei "Thema" "Produkt erstellt" auswählen und den Status auf Aktiv setzen. Für den Namen kannst du Billeroo eintragen. Zu guter Letzt klickst du auf Webhook speichern.</p>\
    <img src="/img/woocommerce-webhook-form.png"/>\
    <p>Wenn dir jetzt "Webhook wurde erfolgreich geupdated" angezeigt wird, hast du es geschafft. Rechnungen werden zukünftig automatisch angelegt.</p>\
    <img src="/img/webhook-updated-successfully.png"/>\
    <p>Sollte etwas nicht funktionieren, helfen wir dir gerne <a href="mailto:service@billeroo.de">service@billeroo.de</a>. </p>',
  },
];

export const plans = {
  starter: {
    name: "Billeroo - Starter",
    iconName: "paper plane",
    pricePerMonthMonthly: "0,00",
    pricePerMonthYearly: "0,00",
    invoiceAmount: "20/Monat",
    woocommerceIcon: "check",
    supportIcon: "times",
    onClickLink: "/invoices/new",
    buttonText: "Jetzt Loslegen",
    color: primaryColor,
  },
  basic: {
    name: "Billeroo - Basic",
    iconName: "plane",
    pricePerMonthMonthly: "10,00",
    pricePerMonthYearly: "8,00",
    invoiceAmount: "40/Monat",
    woocommerceIcon: "check",
    supportIcon: "check",
    onClickLink: "/plans/basic",
    buttonText: "Jetzt Buchen",
    color: primaryColor,
  },
  premium: {
    name: "Billeroo - Premium",
    iconName: "rocket",
    pricePerMonthMonthly: "50,00",
    pricePerMonthYearly: "45,00",
    invoiceAmount: "Endlos",
    woocommerceIcon: "check",
    supportIcon: "check",
    onClickLink: "/plans/premium",
    buttonText: "Jetzt Buchen",
    color: primaryColor,
  },
};
