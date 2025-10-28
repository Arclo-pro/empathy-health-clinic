export default function OfficeMap() {
  return (
    <div className="w-full h-full min-h-[300px] rounded-lg overflow-hidden border">
      <iframe
        title="Empathy Health Clinic Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.477238195598!2d-81.36537!3d28.59544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM1JzQzLjYiTiA4McKwMjEnNTUuMyJX!5e0!3m2!1sen!2sus!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '300px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
