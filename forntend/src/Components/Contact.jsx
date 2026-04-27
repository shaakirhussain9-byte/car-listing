import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Contact = ({ listing }) => {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing.sellerRef}`);
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, [listing.sellerRef]);
  return (
    <>
      {owner && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{owner.username}</span>
          </p>
          <textarea
            onChange={handleChange}
            name="message"
            id="message"
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;