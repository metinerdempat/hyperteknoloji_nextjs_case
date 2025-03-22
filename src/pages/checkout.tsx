import { RootState } from '@/stores';
import { moneyFormatter } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { FC, useMemo } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { clearBasket } from '@/stores/basket-slice';
import axios from 'axios';

type Props = {};

const checkoutSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  city: z.string().nonempty(),
  address: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
  cardNumber: z.string().nonempty(),
  cardName: z.string().nonempty(),
  cardExpiration: z.string().nonempty(),
  cardCvv: z.string().nonempty(),
});

const initialForm = {
  firstName: '',
  lastName: '',
  city: '',
  address: '',
  email: '',
  phone: '',
  cardNumber: '',
  cardName: '',
  cardExpiration: '',
  cardCvv: '',
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://hyperteknoloji-nextjs-case.vercel.app/';

const CheckoutPage: FC<Props> = () => {
  const basket = useSelector((state: RootState) => state.basketStore.basket);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: initialForm,
  });

  const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
    const response = await axios.post(`${APP_URL}/api/checkout`, {
      basket,
    });
    if (response.status !== 200) {
      return toast.error('An error occurred while processing your order!', {});
    }
    dispatch(clearBasket());
    form.reset();
    toast.success('Your order has been received!', {});
  };

  const total = useMemo(() => {
    return basket.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }, [basket]);

  return (
    <section className="app-container mt-12">
      <h1 className="font-bold text-xl text-blue-500">Checkout</h1>
      <div className="mt-5 grid grid-cols-12 gap-5 xl:gap-10">
        <div className="order-2 xl:order-1 col-span-12 xl:col-span-8 bg-white dark:bg-zinc-800 shadow-md p-4 rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className='col-span-1'>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Firstname" />
                    </FormControl>
                  </FormItem>
                )}
              />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                    <FormItem className='col-span-1'>
                        <FormLabel>Lastname</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Lastname" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                    <FormItem className='col-span-2'>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="City" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                    <FormItem className='col-span-2'>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Address" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem className='col-span-2'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Email" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                    <FormItem className='col-span-2'>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Phone" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                    <FormItem className='col-span-1'>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Card Number" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                    <FormItem className='col-span-1'>
                        <FormLabel>Card Name</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Card Name" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardExpiration"
                    render={({ field }) => (
                    <FormItem className='col-span-1'>
                        <FormLabel>Card Expiration</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Card Expiration" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardCvv"
                    render={({ field }) => (
                    <FormItem className='col-span-1'>
                        <FormLabel>Card CVV</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Card CVV" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <div className='col-span-2'>
                    <button type='submit' className='bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600'>Submit</button>
                </div>
            </form>
          </Form>
        </div>

        <div className="order-1 xl:order-2 col-span-12 xl:col-span-4 flex flex-col bg-white h-max dark:bg-zinc-800 shadow-md p-4 rounded-md">
          <h6 className="text-xl font-medium">Hyper Teknoloji Basket</h6>
          <div className="mt-3 flex flex-col gap-2 pl-2">
            {basket.map((product) => (
              <p key={product.id} className="text-sm">
                ({product.quantity}) x <span className="bold">{product.title}</span> - {moneyFormatter(product.price)}
              </p>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2.5">
            <span className="bold">Total:</span>
            <span className="bold text-blue-500">{moneyFormatter(total)}</span>
          </p>

        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
