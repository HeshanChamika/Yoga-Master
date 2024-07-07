import { useEffect, useState } from "react";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch"
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useUser from "../../../../../hooks/useUser";


const MyPaymentHistory = () => {
   const axiosFetch = useAxiosFetch();
   const axiosSecure = useAxiosSecure();
   const {currentUser} = useUser();
   const [payments, setPayments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [paginatedPayments, setPaginatedPayments] = useState([]);
   const totalItems = payments.length;
   const [page, setPage] = useState(1);
   let totalPage = Math.ceil(totalItems / 5);
   let itemsPerPage = 5;
   const handleChange = (event, value) => {
      setPage(value);
   }

   useEffect(() => {
      const lastIndex = page * itemsPerPage;
      const firstIndex = lastIndex - itemsPerPage;
      const currentItems = payments.slice(firstIndex, lastIndex);
      setPaginatedPayments(currentItems);
   }, [page, payments])

   useEffect(() => {
      axiosFetch.get(`/payment-history/${currentUser?.email}`)
      .then(res => {
         setPayments(res.data);
         setLoading(false);
      }).catch(err => console.log(err))
   }, [currentUser.email]);


   const totalPaidAmount = payments.reduce((acc, curr) => acc+ curr.amount, 0);

   if (loading) {
      return <p>Loading...</p>
   }

   const formatDate = (isoString) => {
      const date = new Date(isoString);
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return date.toLocaleString("en-US", options);
    };

  return (
    <div>
      <div className="text-center mt-6 mb-16">
         <p className="text-gray-400">Hey, <span className="text-secondary font-bold">{currentUser.name}</span> Welcome...!</p>
         <h1 className="text-4xl font-bold">My Paym<span className="text-secondary">ent Hist</span>ory</h1>
         <p className="text-gray-500 text-sm my-3">You can see your payment history here</p>
      </div>

      {/* table here */}
      <div>
         <div>
            <p className="font-bold">Total Payments : {payments.length}</p>
            <p className="font-bold">Total Paid : <span className="text-secondary text-2xl">${totalPaidAmount}</span></p>
         </div>

         <div>
            <div>
            <table className="w-full">
               <thead>
                  <tr>
                     <th className="text-left font-semibold">#</th>
                     <th className="text-left font-semibold">Amount</th>
                     <th className="text-left font-semibold">Total Item</th>
                     <th className="text-left font-semibold">Time</th>
                  </tr>
               </thead>

               <tbody>
               {
                  paginatedPayments.map((payment, idx) => (
                     <tr>
                        <td>{idx + 1}</td>
                        <td className="whitespace-nowrap">${payment.amount}</td>
                        <td className="whitespace-nowrap">{payment.classesId.length}</td>
                        <td className="whitespace-nowrap">{formatDate(payment.date)}</td>
                     </tr>
                  ))
               }
               </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  )
}

export default MyPaymentHistory