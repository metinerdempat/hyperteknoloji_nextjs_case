import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('basket checkout', req.body);
    res.status(200).json({ message: 'Checkout Success' });
  }
};

export default handler;
