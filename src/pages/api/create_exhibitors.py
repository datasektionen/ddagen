import requests
import json

users = [
    {
        "contactPerson": "Alice Johnson",
        "telephoneNumber": "0700123456",
        "companyName": "ABC Corporation",
        "organizationNumber": "5567037485",
        "email": "alice@example.com",
        "packageTier": 1,
        "studentMeetings": 0,
        "sendEmailToExhibitor": False,
        "mapPosition": 1
    },
    {
        "contactPerson": "Bob Smith",
        "telephoneNumber": "0700123456",
        "companyName": "XYZ Enterprises",
        "organizationNumber": "0311062624",
        "email": "bob@example.com",
        "packageTier": 2,
        "studentMeetings": 1,
        "sendEmailToExhibitor": False,
        "mapPosition": 2
    },
    {
        "contactPerson": "Charlie Brown",
        "telephoneNumber": "0701122334",
        "companyName": "Brown Industries",
        "organizationNumber": "0304295470",
        "email": "charlie@example.com",
        "packageTier": 2,
        "studentMeetings": 0,
        "sendEmailToExhibitor": False,
        "mapPosition": 3
    },
    {
        "contactPerson": "David Lee",
        "telephoneNumber": "0703344556",
        "companyName": "Lee Corp",
        "organizationNumber": "0301120713",
        "email": "david@example.com",
        "packageTier": 1,
        "studentMeetings": 0,
        "sendEmailToExhibitor": False,
        "mapPosition": 4
    },
    {
        "contactPerson": "Emma Davis",
        "telephoneNumber": "0705566778",
        "companyName": "Davis Ltd.",
        "organizationNumber": "0205174790",
        "email": "emma@example.com",
        "packageTier": 2,
        "studentMeetings": 1,
        "sendEmailToExhibitor": False,
        "mapPosition": 5
    },
    {
        "contactPerson": "Frank Wilson",
        "telephoneNumber": "0707788990",
        "companyName": "Wilson Co.",
        "organizationNumber": "0309074912",
        "email": "frank@example.com",
        "packageTier": 3,
        "studentMeetings": 0,
        "sendEmailToExhibitor": False,
        "mapPosition": 6
    },
    {
        "contactPerson": "Grace Taylor",
        "telephoneNumber": "0701122334",
        "companyName": "Taylor Enterprises",
        "organizationNumber": "0306120270",
        "email": "grace@example.com",
        "packageTier": 1,
        "studentMeetings": 0,
        "sendEmailToExhibitor": False,
        "mapPosition": 7
    },
    {
        "contactPerson": "Henry Martinez",
        "telephoneNumber": "0703344556",
        "companyName": "Martinez Group",
        "organizationNumber": "0206042251",
        "email": "henry@example.com",
        "packageTier": 2,
        "studentMeetings": 1,
        "sendEmailToExhibitor": False,
        "mapPosition": 8
    },
    {
        "contactPerson": "Ivy Johnson",
        "telephoneNumber": "0705566778",
        "companyName": "Ivy Inc.",
        "organizationNumber": "8450007342",
        "email": "ivy@example.com",
        "packageTier": 2,
        "studentMeetings": 0,
        "sendEmailToExhibitor": False,
        "mapPosition": 9
    },
    {
        "contactPerson": "Jack Brown",
        "telephoneNumber": "0707788990",
        "companyName": "Brown & Sons",
        "organizationNumber": "0411232069",
        "email": "jack@example.com",
        "packageTier": 3,
        "studentMeetings": 1,
        "sendEmailToExhibitor": False,
        "mapPosition": 10
    }
]



def main(user):

    url = "http://localhost:3000/api/import-exhibitor?Authorization=test-WLHSxbluEaB2-B5kCPjO4h066TiKtXt_0_WrMHkLNMQ&Content-Type=application/json"

    payload = json.dumps(user)
    headers = {
        'Content-Type': 'text/plain',
        'Authorization': 'test-WLHSxbluEaB2-B5kCPjO4h066TiKtXt_0_WrMHkLNMQ',
        'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)

    print(response.text)


if __name__ == "__main__":
    for user in users:
        main(user)