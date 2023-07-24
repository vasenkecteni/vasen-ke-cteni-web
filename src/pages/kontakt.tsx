import Page from "~/components/Page";
import React from "react";
import {FiMail, FiPhone} from "react-icons/fi";
import {FaInstagram, FaLinkedin} from "react-icons/fa";

export default function Contact() {
  return (
    <Page metaTitle={"Kontakt"} className={"font-medium"}>
      <div className="container mx-auto max-w-5xl sm:px-10 lg:px-0 mt-24 lg:mt-20">
        <div className="flex flex-col md:flex-row gap-14 px-4">
          <div className="">
            <h1 className={"title-xl"}>
              Kontaktujte nás
            </h1>
            <p className="text-xl mt-8">
              Máte problém? Otázku? Nebo nás chcete jen pozdravit? Jsme tu pro vás.
            </p>
            <Socials className={'mt-8'} />
            <LegalInfo className={'mt-8 hidden sm:block'} />
          </div>
          <div className={'w-full'}>
            <ContactUsForm />
          </div>
        </div>
      </div>
    </Page>
  )
}

function ContactUsForm() {
  return (
    <div>

    </div>
  )
}

function Socials(props: {className?: string}) {

  return (
    <div className={props.className + ' text-lg'}>
      <ContactInfoItem icon={<FiMail />} href="mailto:info@crossbeliever.com">
        info@crossbeliever.com
      </ContactInfoItem>

      <ContactInfoItem icon={<FiPhone />} href="tel:+420604744760">
        +420 604 744 760
      </ContactInfoItem>

      <ContactInfoItem icon={<FaInstagram />} href="https://instagram.com/">
        Instagram
      </ContactInfoItem>

      <ContactInfoItem
        icon={<FaLinkedin />}
        href="https://www.linkedin.com/in/mat%C4%9Bj-pl%C5%A1ek-64906419b/"
      >
        LinkedIn
      </ContactInfoItem>
    </div>
  )
}

function LegalInfo(props: {className?: string}) {
  return (
    <div className={props.className + ' text-lg'}>
      <p>Vášeň ke čtení, z.s.</p>
      <p>Skrétova 475/8, Jižní Předměstí, 301 00 Plzeň</p>
      <p>IČO: 78623091</p>
    </div>
  )
}

function ContactInfoItem(props: {icon: JSX.Element, children: string, href?: string}) {
  return (
    <div className="flex flex-row items-center gap-4">
      {props.icon}
      <a href={props.href} className={"text-[#529BAB] hover:text-blue-400"}>
        {props.children}
      </a>
    </div>
  )
}