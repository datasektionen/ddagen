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
        <div className="w-full max-w-lg ">
  
            <form method="post" className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md ">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2 text-lg">{props.t.companyForm.name}:</label>
                    <input 
                        type="text" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange={(e) => {setName(e.target.value);}} />
                </div>

                <div className="mb-4">
                    <label htmlFor="orgNum" className="block text-gray-700 font-bold mb-2 text-lg">{props.t.companyForm.orgNum}:</label>
                    <input 
                        type="text" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="orgNum"
                        name="orgNum"
                        value={orgNum} 
                        onChange={(e) => {setOrgNum(e.target.value);}}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="contact" className="block text-gray-700 font-bold mb-2 text-lg">{props.t.companyForm.contact}:</label>
                    <input 
                        type="text" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="contact" 
                        name="contact" 
                        value={contact} 
                        onChange={(e) => {setContact(e.target.value);}}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-lg">{props.t.companyForm.email}:</label>
                    <input 
                        type="text" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value);}}
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="invAddress" className="block text-gray-700 font-bold mb-2 text-lg">{props.t.companyForm.invAddress}:</label>
                    <input 
                        type="text" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="invAddress" 
                        name="invAddress" 
                        value={invAddress} 
                        onChange={(e) => {setInvAddress(e.target.value);}}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="invEmail" className="block text-gray-700 font-bold mb-2 text-lg">{props.t.companyForm.invEmail}:</label>
                    <input 
                        type="text" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="invEmail" 
                        name="invEmail" 
                        value={invEmail} 
                        onChange={(e) => {setInvEmail(e.target.value);}}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(e) => addCompanyDocument(e)}>
                        {props.t.companyForm.next}
                    </button>
                </div>

            </form>
        </div>
    );
};