import type { NextApiRequest, NextApiResponse } from 'next';
import { FAQS } from '@/constants';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  return res.status(200).json(FAQS);
}

export default handler;
