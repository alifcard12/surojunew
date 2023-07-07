import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TemaMerah from "../components/Tema/TemaMerah";
import TemaHijau from "../components/Tema/TemaHijau";
import TemaBiru from "../components/Tema/TemaBiru";
import TemaKuning from "../components/Tema/TemaKuning";
import NotFound from "../components/error/NotFound";

const Undangan = () => {
  const { domain } = useParams();
  const [order, setOrder] = useState(null);
  const [mempelai, setMempelai] = useState(null);
  const [acara, setAcara] = useState(null);
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/order/${domain}`);
        setOrder(response.data);
        fetchMempelai(response.data);
        fetchAcara(response.data);
        fetchQuote(response.data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    const fetchMempelai = async (orderData) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/mempelai/user/${orderData.userId}`);
        setMempelai(response.data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAcara = async (orderData) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/acara/user/${orderData.userId}`);
        setAcara(response.data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchQuote = async (orderData) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/quote/user/${orderData.userId}`);
        if (response.data.length > 0) {
          setQuote(response.data[0]);
        } else {
          setQuote(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [domain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!order || !mempelai || !acara) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  let temaComponent;

  if (order.tema === "Merah") {
    temaComponent = <TemaMerah order={order} mempelai={mempelai} acara={acara} quote={quote} />;
  } else if (order.tema === "Hijau") {
    temaComponent = <TemaHijau order={order} mempelai={mempelai} acara={acara} />;
  } else if (order.tema === "Biru") {
    temaComponent = <TemaBiru order={order} mempelai={mempelai} acara={acara} />;
  } else if (order.tema === "Kuning") {
    temaComponent = <TemaKuning order={order} mempelai={mempelai} acara={acara} />;
  } else {
    temaComponent = <div>Tema not found</div>;
  }

  return <div>{temaComponent}</div>;
};

export default Undangan;
