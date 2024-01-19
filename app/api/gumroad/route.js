export default function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
  
  
    // not needed in NextJS v12+
    const body = JSON.parse(req.body)
  
    // the rest of your code
    console.log("recieved: " + req.body);
    res.status(200).send({ message: 'Hello from Next.js!' })
  }
  