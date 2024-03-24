/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch } from "react";
import { formatCurrency } from "../helpers";
import { OrderItem } from "../types";
import { useMemo } from "react";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    dispatch: Dispatch<OrderActions>
};

const OrderTotal = ({ order, tip, dispatch } : OrderTotalsProps) => {

    const subTotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0) , [order]);
    const tipAmount = useMemo(() => subTotalAmount * tip, [tip, order]);
    const totalAmount = useMemo(() => subTotalAmount + tipAmount, [tip, order]);

    return ( 
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propina:</h2>
                <p>Subtotal a pagar: {''}
                    <span className="font-bold">{ formatCurrency(subTotalAmount) }</span>
                </p>

                <p>Propina: {''}
                    <span className="font-bold">{ formatCurrency(tipAmount) }</span>
                </p>

                <p>Total a pagar: {''}
                    <span className="font-bold">{ formatCurrency(totalAmount) }</span>
                </p>
            </div>

            <button
                className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                disabled={totalAmount === 0}
                onClick={() => dispatch({type: 'place-order'})}
            >
                Guardar Orden
            </button>
        </>
     );
}
 
export default OrderTotal;