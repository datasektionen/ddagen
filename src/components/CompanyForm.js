import { useState } from "react";
import firebase from "../../firebase/clientApp";

export default function CompanyForm(props) {
    const db = firebase.firestore();
    
    const [name, setName] = useState("");
    const [orgNum, setOrgNum] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [invAddress, setInvAddress] = useState("");
    const [invEmail, setInvEmail] = useState("");

    async function addCompanyDocument(e) {
        e.preventDefault();
        // TODO Decide on how user id
        await db.collection('Företag').add({            
            Företagsnamn: name,
            Organisationsnummer: orgNum,
            Kontaktperson: contact,
            Meljadress: email,
            Faktureringsadress: invAddress,
            MejladressFörFakturering: invEmail
        });
    }

    return (
        <div className="w-full flex justify-center py-16">
  
            <form method="post" className="bg-transparent w-3/5">
                <div className="my-16 relative">
                    <input 
                        required
                        type="text" 
                        className="peer bg-transparent appearance-none border-b-2 border-gray-400 focus:border-cerise w-full py-2 px-1 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange={(e) => {setName(e.target.value);}} />
                    <label htmlFor="name" className="transform transition-all absolute cursor-text text-gray-400 font-bold text-lg top-0 left-0 peer-focus:text-cerise peer-focus:-translate-y-full peer-focus:text-sm peer-valid:-translate-y-full peer-valid:text-sm uppercase">{props.t.companyForm.name}:</label>
                </div>

                <div className="my-16 relative">
                    <input 
                        required
                        type="text" 
                        className="peer bg-transparent appearance-none border-b-2 border-gray-400 focus:border-cerise w-full py-2 px-1 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" 
                        id="orgNum"
                        name="orgNum"
                        value={orgNum} 
                        onChange={(e) => {setOrgNum(e.target.value);}}
                    />
                    <label htmlFor="orgNum" className="transform transition-all absolute cursor-text text-gray-400 font-bold text-lg top-0 left-0 peer-focus:text-cerise peer-focus:-translate-y-full peer-focus:text-sm peer-valid:-translate-y-full peer-valid:text-sm uppercase">{props.t.companyForm.orgNum}:</label>
                </div>

                <div className="my-16 relative">
                    <input 
                        required
                        type="text" 
                        className="peer bg-transparent appearance-none border-b-2 border-gray-400 focus:border-cerise w-full py-2 px-1 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" 
                        id="contact" 
                        name="contact" 
                        value={contact} 
                        onChange={(e) => {setContact(e.target.value);}}
                    />
                    <label htmlFor="contact" className="transform transition-all absolute cursor-text text-gray-400 font-bold text-lg top-0 left-0 peer-focus:text-cerise peer-focus:-translate-y-full peer-focus:text-sm peer-valid:-translate-y-full peer-valid:text-sm uppercase">{props.t.companyForm.contact}:</label>
                </div>

                <div className="my-16 relative">
                    <input 
                        required
                        type="text" 
                        className="peer bg-transparent appearance-none border-b-2 border-gray-400 focus:border-cerise w-full py-2 px-1 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value);}}
                    />
                    <label htmlFor="email" className="transform transition-all absolute cursor-text text-gray-400 font-bold text-lg top-0 left-0 peer-focus:text-cerise peer-focus:-translate-y-full peer-focus:text-sm peer-valid:-translate-y-full peer-valid:text-sm uppercase">{props.t.companyForm.email}:</label>
                </div>
                
                <div className="my-16 relative">
                    <input 
                        required
                        type="text" 
                        className="peer bg-transparent appearance-none border-b-2 border-gray-400 focus:border-cerise w-full py-2 px-1 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" 
                        id="invAddress" 
                        name="invAddress" 
                        value={invAddress} 
                        onChange={(e) => {setInvAddress(e.target.value);}}
                    />
                    <label htmlFor="invAddress" className="transform transition-all absolute cursor-text text-gray-400 font-bold text-lg top-0 left-0 peer-focus:text-cerise peer-focus:-translate-y-full peer-focus:text-sm peer-valid:-translate-y-full peer-valid:text-sm uppercase">{props.t.companyForm.invAddress}:</label>
                </div>

                <div className="my-16 relative">
                    <input 
                        required
                        type="text" 
                        className="peer bg-transparent appearance-none border-b-2 border-gray-400 focus:border-cerise w-full py-2 px-1 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" 
                        id="invEmail" 
                        name="invEmail" 
                        value={invEmail} 
                        onChange={(e) => {setInvEmail(e.target.value);}}
                    />
                    <label htmlFor="invEmail" className="transform transition-all absolute cursor-text text-gray-400 font-bold text-lg top-0 left-0 peer-focus:text-cerise peer-focus:-translate-y-full peer-focus:text-sm peer-valid:-translate-y-full peer-valid:text-sm uppercase">{props.t.companyForm.invEmail}:</label>
                </div>

                <div className="flex flex-col items-center justify-between">
                    <button className="bg-cerise hover:bg-cerise-light text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" onClick={(e) => addCompanyDocument(e)}>
                        {props.t.companyForm.next}
                    </button>
                </div>

            </form>
        </div>
    );
};