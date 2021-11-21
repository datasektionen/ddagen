let ip = "0.0.0.0";
let n = 0;

function setIP(newIP: string) {
    ip = newIP;
}

function GETCount(): number {
    fetch("https://" + ip + "/counter", {})
        .then(response => response.json())
        .then(data => n = data.count);
    return n;
}

function POSTCount(n: number) {
    fetch("https://" + ip + "/counter/update", {
        method: 'POST',
        headers: { conetent: "application/json" },
        body: JSON.stringify({ upd: n })
    });
}

function PUTCount(n: number) {
    fetch("https://" + ip + "/counter/reset", {
        method: 'PUT',
        headers: { conetent: "application/json" },
        body: JSON.stringify({ val: n })
    });
}

export { GETCount, POSTCount, PUTCount, setIP }