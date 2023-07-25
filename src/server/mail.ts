import SMTPTransport from "nodemailer/lib/smtp-transport";
import {env} from "~/env.mjs";
import {createTransport} from "nodemailer";
import {ContactUsData} from "~/components/ContactUsForm";

export const baseTransport: SMTPTransport.Options = {
  host: env.EMAIL_HOST,
  port: parseInt(env.EMAIL_PORT),
  secure: env.EMAIL_USE_SSL === "true",
}

const mainTransporter = createTransport({
  ...baseTransport,
  auth: {
    user: env.EMAIL_USERNAME_MAIN,
    pass: env.EMAIL_PASSWORD,
  },
  from: `Vášeň ke čtení <${env.EMAIL_USERNAME_MAIN}>`
});

const noreplyTransporter = createTransport({
  ...baseTransport,
  auth: {
    user: env.EMAIL_USERNAME_NOREPLY,
    pass: env.EMAIL_PASSWORD,
  },
  from: `Vášeň ke čtení <${env.EMAIL_USERNAME_NOREPLY}>`
});

// Mail class.
export default class Mail {
  private static getNoreplyFooter = () => {
    return '————————————————————————————\n\nToto je automaticky generovaný email. Na tuto zprávu neodpovídejte.';
  }

  private static getCompanyFooter = () => {
    return 'S pozdravem,\nVášeň ke čtení';
  }

  private static buildText = (...parts: string[]) => {
    parts.push(this.getCompanyFooter());
    return parts.join("\n\n");
  }

  public static async sendFormSubmissionMail(data: ContactUsData) {
    // Get current date and time in czech locale.
    const time = new Date().toLocaleString("cs-CZ", {
      timeZone: "Europe/Prague",
    });

    const header =
      `Nová zpráva z webového formuláře.\n`
      + `Odesláno: ${time}\n`
      + `Jméno: ${data.name}\n`
      + `Email: ${data.email}\n`
      + `Telefon: ${data.phone || "neuvedeno"}`;

    const text = this.buildText(
      header,
      data.message,
      this.getNoreplyFooter()
    )

    await noreplyTransporter.sendMail({
      to: env.EMAIL_USERNAME_MAIN,
      subject: "Zpráva z webového formuláře",
      text: text,
      from: `Vášeň ke čtení • Formulář <${env.EMAIL_USERNAME_NOREPLY}>`,
    });
  }

  public static async sendFormSubmissionAcknowledgementMail(userMail: string) {
    const content = `Dobrý den,\n\nVáš formulář byl úspěšně zaznamenán. Odpovíme nejdříve, jak to bude možné.`;
    const text = this.buildText(
      content,
      this.getNoreplyFooter()
    )

    await noreplyTransporter.sendMail({
      to: userMail,
      subject: "Potvrzení o odeslání zprávy",
      text: text,
      from: `Vášeň ke čtení • Formulář <${env.EMAIL_USERNAME_NOREPLY}>`,
    });
  }
}