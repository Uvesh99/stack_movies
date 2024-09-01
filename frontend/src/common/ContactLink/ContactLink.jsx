import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../Footer/Footer.css';

const ContactLink = () => {

  const sendMsg = () => {
    const phoneNumber = "+911234567890";
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank").focus();
  };

  return (
    <div className="link contact_no">
    <abbr title="contact">
      <div className="whats" onClick={sendMsg}>
          <WhatsAppIcon sx={{color:'white',marginLeft:'1rem',height:'4rem',width:'4rem'}}/>
      </div>
      </abbr>
    </div>
  );
};

export default ContactLink;