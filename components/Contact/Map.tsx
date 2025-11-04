import Container from "../Reusable/Container";

export default function Map() {
    return (
      <Container disableYSpacing className="bg-[#F6F9FC] md:mb-40 mb-[88px] mt-[70px]">
        <div className="w-full h-[530px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8947234567!2d72.86849431490234!3d19.11235498704567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676a12345%3A0x987654321abcdef0!2sMeadows%2C%20Sahar%20Plaza%2C%20Andheri-Kurla%20Rd%2C%20J%20B%20Nagar%2C%20Andheri%20East%2C%20Mumbai%2C%20Maharashtra%20400059!5e0!3m2!1sen!2sin!4v1693567890123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Meadows Sahar Plaza Mumbai Office Location"
          />
        </div>
      </Container>
    );
}