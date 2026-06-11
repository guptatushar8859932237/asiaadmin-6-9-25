import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../Assests/logo.png";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const handleclicknav = () => {
    // navigate("/Admin/managefreight");
    window.history.back();
};

const AddQuotesInvoice = () => {
    const [openmodal, setOpenmodal] = useState(false);
    const [openmodal1, setOpenmodal1] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [selected, setSelected] = useState("");
    const [dat1, setDat1] = useState([]);
    const [freightData, setFreightData] = useState([]);
    const [getdata, setGetdata] = useState([]);
    const [freight, setFreight] = useState([0]);
    const [quotationID, setQuotationID] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getdatsupplier();
        getdataFreight();
    }, []);

    const user = JSON.parse(localStorage.getItem("data123"));
    const getdatsupplier = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
            .then((response) => {
                setDat1(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                test(error.response.data);
            });
    };

    const getdataFreight = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}getFreightDropdown`)
            .then((response) => {
                setFreightData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                test(error.response.data);
            });
    };

    const getdataFreightById = async (freightId) => {
        console.log(freightId,)
        const payload = {
            freight_id: freightId,
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}freight-list-byId`, payload,
            )
            console.log(response.data);
            setOpenmodal(false);
            setGetdata(response.data.data[0]);
        } catch (error) {
            console.error("Error fetching freight data by id:", error);
        }
    };

    const andlemodaloen = () => {
        setOpenmodal(true);
    };

    const andndndn = () => {
        setOpenmodal1(true);
    };

    const closemodal = () => {
        setOpenmodal(false);
    };
    const setSelected1111 = async (value) => {
        console.log(value);
        setSelected(value);
    };

    const setSelecSupplier = async (value) => {
        console.log(value);
        setSelectedSupplier(value);
        setTimeout(() => {
            setOpenmodal1(false);
        }, 1000);
    };

    const handlechangecalc = (e) => {
        const { name, value } = e.target;
        setFreight((prevInputData) => ({
            ...prevInputData,
            [name]: value,
        }));
    };

    const freight_amount = freight?.origin_pick_up_entey * freight?.origin_pick_up_Unit;
    const num1 = parseFloat(freight_amount || 0);
    const num2 = parseFloat(freight.freight_gp || 0);
    const num3 = num1 / (1 - num2 / 100);
    const finalval = isNaN(num3) ? 0 : num3.toFixed(2);
    const finalvalflo = parseFloat(finalval);
    console.log(freight_amount)
    console.log(num1)
    console.log(num2)
    console.log(num3)
    console.log(finalval)

    const oripick1 = parseFloat(freight.origin_pick_up_cost) || 0;
    // const oripick2 = parseFloat(freight.origin_pick_up_fees) || 0;
    const oripick2 =
        freight.origin_pick_up_unitType == "1" ? 1 : freight.chargable_rate;
    const oripick3 = parseFloat(freight.origin_pickup_fee_gpcalc) || 0;
    const oripick4 = freight.origin_pick_up_unitType
        ? oripick1 * oripick2 * freight.freight_charge_currencyQTY
        : 0.0;
    let finalValue = 0;
    if (oripick4 > 0) {
        finalValue = oripick4 * (1 + oripick3 / 100);
    }
    const finalori1 = isNaN(finalValue) ? "0.00" : finalValue.toFixed(2);
    const finalvlaueoriginPickup =
        finalori1 * parseInt(freight?.roe_origin_currencyorigin);
    const orifuel1 = parseFloat(freight.origin_pick_up_fuel_cost) || 0;
    // const orifuel2 = parseFloat(freight.origin_pick_up_fuel_fees) || 0;
    const orifuel2 =
        freight.origin_pick_up_fuel_unitType === "1" ? 1 : freight.chargable_rate;
    const orifuel3 = parseFloat(freight.origin_pick_fuelGP) || 0;
    const orifuel4 = freight.origin_pick_up_fuel_unitType
        ? orifuel1 * orifuel2 * freight.origin_pick_up_fuel_unitTypeQTY
        : 0.0;
    let finalValueFuel = 0;
    if (orifuel4 > 0) {
        finalValueFuel = orifuel4 * (1 + orifuel3 / 100);
    }
    const finalfuel1 = isNaN(finalValueFuel) ? "0.00" : finalValueFuel.toFixed(2);
    const finalvlaueoFuel =
        finalfuel1 * parseInt(freight?.roe_origin_fuel_currency);
    const oricfs1 = parseFloat(freight.origin_pick_up_cfs_cost) || 0;
    // const oricfs2 = parseFloat(freight.origin_pick_up_cfs_fees) || 0;
    const oricfs2 = parseFloat(
        freight.origin_pick_up_cfs_unitType === "1" ? 1 : freight.chargable_rate,
    );
    const oricfs3 = parseFloat(freight.origin_pickup_vfs_gp) || 0;
    const oricfs4 = freight.origin_pick_up_cfs_unitType
        ? oricfs1 * oricfs2 * freight.origin_pick_up_cfs_unitTypeQTY
        : 0.0;
    let finalValuecfs = 0;
    if (oricfs4 > 0) {
        finalValuecfs = oricfs4 * (1 + oricfs3 / 100);
    }
    const finalcfs1 = isNaN(finalValuecfs) ? "0.00" : finalValuecfs.toFixed(2);
    const finalvlaueocfs = finalcfs1 * parseInt(freight?.roe_origin_cfs_currency);

    const oridoc1 = parseFloat(freight.origin_pick_up_documantion_cost) || 0;
    // const oridoc2 = parseFloat(freight.origin_pick_up_documantation_fees) || 0;
    const oridoc2 = parseFloat(
        freight.origin_pick_up_documantation_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    const oridoc3 = parseFloat(freight.origin_pick_documantation_cost_gp) || 0;
    const oridoc4 = freight.origin_pick_up_documantation_unitType
        ? oridoc1 * oridoc2 * freight.origin_pick_up_documantation_unitTypeQTY
        : 0.0;
    let finalValuedoc = 0;
    if (oridoc4 > 0) {
        finalValuedoc = oridoc4 * (1 + oridoc3 / 100);
    }
    console.log(oridoc4);
    const finaldoc1 = isNaN(finalValuedoc) ? "0.00" : finalValuedoc.toFixed(2);
    console.log(finaldoc1, "finaldoc1");
    console.log(freight.roe_origin_doc_currency);
    console.log(parseInt(freight?.roe_origin_doc_currency));
    const finalvlaueodoc = finaldoc1 * parseInt(freight?.roe_origin_doc_currency);

    const oriforewarding1 =
        parseFloat(freight.origin_pick_up_forewarding_cost) || 0;
    const oriforewarding2 = parseFloat(
        freight.origin_pick_up_forewarding_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    // const oriforewarding2 =
    //   parseFloat(freight.origin_pick_up_forewarding_fees) || 0;
    const oriforewarding3 = parseFloat(freight.origin_pickup_forewarding_gp) || 0;
    const oriforewarding4 = freight.origin_pick_up_forewarding_unitType
        ? oriforewarding1 *
        oriforewarding2 *
        freight.origin_pick_up_forewarding_unitTypeQTY
        : 0.0;
    let finalValueforewarding = 0;
    if (oriforewarding4 > 0) {
        finalValueforewarding = oriforewarding4 * (1 + oriforewarding3 / 100);
    }
    console.log(oriforewarding4);
    const finalforewarding1 = isNaN(finalValueforewarding)
        ? "0.00"
        : finalValueforewarding.toFixed(2);
    console.log(finalforewarding1, "finalforewarding1");
    console.log(freight.roe_origin_forewarding);
    console.log(parseInt(freight?.roe_origin_forewarding));
    const finalvlaueoforewarding =
        finalforewarding1 * parseInt(freight?.roe_origin_forewarding);
    const oricustome1 = parseFloat(freight.origin_pick_up_custome_cost) || 0;
    // const oricustome2 = parseFloat(freight.origin_pick_up_custome_clearance) || 0;
    const oricustome2 = parseFloat(
        freight.origin_pick_up_custome_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    const oricustome3 = parseFloat(freight.origin_pickup_custome_gp) || 0;
    const oricustome4 = freight.origin_pick_up_custome_unitType
        ? oricustome1 * oricustome2 * freight.origin_pick_up_custome_unitTypeQTY
        : 0.0;
    let finalValuecustome = 0;
    if (oricustome4 > 0) {
        finalValuecustome = oricustome4 * (1 + oricustome3 / 100);
    }
    console.log(oriforewarding4);
    const finalcustomes1 = isNaN(finalValuecustome)
        ? "0.00"
        : finalValuecustome.toFixed(2);
    console.log(finalcustomes1, "finalcustomes1");
    console.log(freight.roe_origin_customes);
    console.log(parseInt(freight?.roe_origin_customes));
    const finalvlaueoCustomes =
        finalcustomes1 * parseInt(freight?.roe_origin_customes);
    const safeNumber = (val) => {
        const num = Number(val);
        return isNaN(num) ? 0 : num;
    };

    const calculateInvoiceBreakup = (amount, discountPercent, vatPercent) => {
        const baseAmount = safeNumber(amount);
        const discountAmount = (baseAmount * safeNumber(discountPercent)) / 100;
        const exclusiveAmount = baseAmount - discountAmount;
        const vatAmount = (exclusiveAmount * safeNumber(vatPercent)) / 100;
        const inclusiveAmount = exclusiveAmount + vatAmount;

        return {
            disc: discountAmount,
            exclusive: exclusiveAmount,
            vat: vatAmount,
            inclusive: inclusiveAmount,
        };
    };

    const formatMoney = (value) => safeNumber(value).toFixed(2);

    const calculateCustomChargeRow = (prefix) => {
        const unitType = freight[`${prefix}_unitTyp`];
        const unit = unitType === "1" ? 1 : safeNumber(freight.chargable_rate);
        const totalCost = unitType
            ? safeNumber(freight[`${prefix}_cost`]) * unit * safeNumber(freight[`${prefix}_qty`])
            : 0;
        const finalAmt = totalCost * safeNumber(freight[`${prefix}_roe`]);

        return { unit, totalCost, finalAmt };
    };

    const customChargeRows = {
        cust_duty: calculateCustomChargeRow("cust_duty"),
        cust_vat: calculateCustomChargeRow("cust_vat"),
        adv_duty: calculateCustomChargeRow("adv_duty"),
        cust_penalty: calculateCustomChargeRow("cust_penalty"),
        custProv_pay: calculateCustomChargeRow("custProv_pay"),
        clearing_fee: calculateCustomChargeRow("clearing_fee"),
        disbursement: calculateCustomChargeRow("disbursement"),
        surcharge: calculateCustomChargeRow("surcharge"),
    };

    const totalChageswithOutExchange =
        safeNumber(oripick4) +
        safeNumber(orifuel4) +
        safeNumber(oricfs4) +
        safeNumber(oridoc4) +
        safeNumber(oriforewarding4) +
        safeNumber(oricustome4);
    console.log(totalChageswithOutExchange);
    const totalChangeRoeOrigin =
        safeNumber(finalvlaueoriginPickup) +
        safeNumber(finalvlaueoFuel) +
        safeNumber(finalvlaueocfs) +
        safeNumber(finalvlaueodoc) +
        safeNumber(finalvlaueoCustomes) +
        safeNumber(finalvlaueoforewarding);
    // ////////////////////////////freight calculation
    const orifreight1 = parseFloat(freight.freight_charge_currency_cost) || 0;
    // const orifreight2 = parseFloat(freight.freight_charge_currency_fees) || 0;
    const orifreight2 = parseFloat(
        freight.freight_charge_currency_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    const orifreight3 = parseFloat(freight.freight_charge_currency_gp) || 0;
    const orifreight4 = freight.freight_charge_currency_unitType
        ? orifreight1 * orifreight2 * freight.freight_charge_currency_unitTypeQTY
        : 0.0;
    let finalValuefreight = 0;
    if (orifreight4 > 0) {
        console.log(orifreight4);
        finalValuefreight = orifreight4 * (1 + orifreight3 / 100);
    }
    console.log(orifreight4);
    const finalfreight1 = isNaN(finalValuefreight)
        ? "0.00"
        : finalValuefreight.toFixed(2);
    const finalvlaueofreight =
        finalfreight1 * parseInt(freight?.roe_freight_currency);
    const oriinsurance1 =
        parseFloat(freight.freight_currency_insurance_cost) || 0;
    const oriindsurance2 = parseFloat(
        freight.freight_currency_insurance_unittype === "1"
            ? 1
            : freight.chargable_rate,
    );
    // const oriindsurance2 =
    //   parseFloat(freight.freight_currency_insurance_unit) || 0;
    const oriinsurance3 = parseFloat(freight.freightorigin_insurance_gp) || 0;
    const oriinsurance4 = freight.freight_currency_insurance_unittype
        ? oriinsurance1 *
        oriindsurance2 *
        freight.freight_currency_insurance_unittypeQTY
        : 0.0;
    let finalValueinsurance = 0;
    if (oriinsurance4 > 0) {
        finalValueinsurance = oriinsurance4 * (1 + oriinsurance3 / 100);
    }
    console.log(oriinsurance4);
    const finalinsurance1 = isNaN(finalValueinsurance)
        ? "0.00"
        : finalValueinsurance.toFixed(2);
    console.log(finalfreight1, "finalfreight1");
    console.log(freight.roe_insurance_currency);
    console.log(parseInt(freight?.roe_insurance_currency));
    const finalvlaueoInsurance =
        finalinsurance1 * parseInt(freight?.roe_insurance_currency);
    console.log(finalvlaueoFuel, "finalvlaueoFuel");
    console.log(orifuel1, orifuel3, orifuel4, finalValueFuel, finalvlaueoFuel);

    const totalChageswithOutExchangeinsurance =
        safeNumber(orifreight4) + safeNumber(oriinsurance4);

    console.log(totalChageswithOutExchangeinsurance);

    const totalChangeRoeOriginaftercalcuinsurance =
        safeNumber(finalvlaueoInsurance) + safeNumber(finalvlaueofreight);

    ///////////////////////////////transit change/////////////////////////////////////////////

    const oritransit1 = parseFloat(freight.Transit_currency_Cost) || 0;
    // const oritransit2 = parseFloat(freight.Transit_currency_unit) || 0;
    const oritransit2 = parseFloat(
        freight.Transit_currency_unitTpe === "1" ? 1 : freight.chargable_rate,
    );
    const oritransit3 = parseFloat(freight.Transit_currency_gp) || 0;
    const oritransit4 = freight.Transit_currency_unitTpe
        ? oritransit1 * oritransit2 * freight.Transit_currency_unitTpeQTY
        : 0.0;
    let finalValuetransit = 0;
    if (oritransit4 > 0) {
        finalValuetransit = oritransit4 * (1 + oritransit3 / 100);
    }
    console.log(oriinsurance4);
    const finaltransit1 = isNaN(finalValuetransit)
        ? "0.00"
        : finalValuetransit.toFixed(2);
    const finalvlaueotransit =
        finaltransit1 * parseInt(freight?.Transit_currency_roe);

    const oriThc1 = parseFloat(freight.transit_currency_THC_cost) || 0;
    // const oriThc2 = parseFloat(freight.transit_currency_THC_init) || 0;
    const oriThc2 = parseFloat(
        freight.transit_currency_THC_initType === "1" ? 1 : freight.chargable_rate,
    );
    const oriThc3 = parseFloat(freight.transit_currency_THC_gp) || 0;
    const oriThc4 = freight.transit_currency_THC_initType
        ? oriThc1 * oriThc2 * freight.transit_currency_THC_initTypeQTY
        : 0.0;
    let finalValueThc = 0;
    if (oriThc4 > 0) {
        finalValueThc = oriThc4 * (1 + oriThc3 / 100);
    }
    const finalThc1 = isNaN(finalValueThc) ? "0.00" : finalValueThc.toFixed(2);
    const finalvlaueotfineal = finalThc1 * parseInt(freight?.roe_Transit_Thc);

    const oriunpack1 = parseFloat(freight.Transit_currency_unpack_cost) || 0;
    const oriunpack2 = parseFloat(
        freight.Transit_currency_unpack_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    // const oriunpack2 = parseFloat(freight.Transit_currency_unpack_unit) || 0;
    const oriunpack3 = parseFloat(freight.Transit_currency_unpack_gp) || 0;
    const oriunpack4 = freight.Transit_currency_unpack_unitType
        ? oriunpack1 * oriunpack2 * freight.transit_currency_THC_initTypeeQTY
        : 0.0;
    let finalValueUnpack = 0;
    if (oriunpack4 > 0) {
        finalValueUnpack = oriunpack4 * (1 + oriunpack3 / 100);
    }
    const finalunpack1 = isNaN(finalValueUnpack)
        ? "0.00"
        : finalValueUnpack.toFixed(2);
    const finalvlaueotfunpack =
        finalunpack1 * parseInt(freight?.Transit_unpack_roe);

    const ori3rdparty1 = parseFloat(freight.transit_3rd_party_cost) || 0;
    // const ori3rdparty2 = parseFloat(freight.transit_3rd_party_unit) || 0;
    const ori3rdparty2 = parseFloat(
        freight.transit_3rd_party_unittype === "1" ? 1 : freight.chargable_rate,
    );
    const ori3rdparty3 = parseFloat(freight.transit_3rd_party_gp) || 0;
    const ori3rdparty4 = freight.transit_3rd_party_unittype
        ? ori3rdparty1 * ori3rdparty2 * freight.transit_3rd_party_unittypeQTY
        : 0.0;
    let finalValue3rdparty = 0;
    if (ori3rdparty4 > 0) {
        finalValue3rdparty = ori3rdparty4 * (1 + ori3rdparty3 / 100);
    }
    const final3rdparty1 = isNaN(finalValue3rdparty)
        ? "0.00"
        : finalValue3rdparty.toFixed(2);
    const finalvlaueot3dparty =
        final3rdparty1 * parseInt(freight?.transit_currency_3rd);

    const ori3rdAdmin1 = parseFloat(freight.transit_admin_change) || 0;
    // const ori3rdAdmin2 = parseFloat(freight.transit_admin_unit) || 0;
    const ori3rdAdmin2 = parseFloat(
        freight.transit_admin_unittype === "1" ? 1 : freight.chargable_rate,
    );
    const ori3rdAdmin3 = parseFloat(freight.transit_admin_gp) || 0;
    const ori3rdAdmin4 = freight.transit_admin_unittype
        ? ori3rdAdmin1 * ori3rdAdmin2 * freight.transit_admin_unittypeQTY
        : 0.0;
    let finalValueAdmin = 0;
    if (ori3rdAdmin4 > 0) {
        finalValueAdmin = ori3rdAdmin4 * (1 + ori3rdAdmin3 / 100);
    }
    const final3rdAdmin1 = isNaN(finalValueAdmin)
        ? "0.00"
        : finalValueAdmin.toFixed(2);
    const finalvlaueotAdmin =
        final3rdAdmin1 * parseInt(freight?.roe_transit_admin);

    const ori3rdport1 = parseFloat(freight.transit_currency_port) || 0;
    const ori3rdport2 = parseFloat(
        freight.transit_currency_port_unitType === "1" ? 1 : freight.chargable_rate,
    );
    const ori3rdport3 = parseFloat(freight.transit_currency_port_gp) || 0;
    const ori3rdport4 = freight.transit_currency_port_unitType
        ? ori3rdport1 * ori3rdport2 * freight.transit_currency_port_unitTypeQTY
        : 0.0;
    let finalValueport = 0;
    if (ori3rdport4 > 0) {
        finalValueport = ori3rdport4 * (1 + ori3rdport3 / 100);
    }
    const final3rdport1 = isNaN(finalValueport)
        ? "0.00"
        : finalValueport.toFixed(2);
    const finalvlaueotPort = final3rdport1 * parseInt(freight?.roe_trans_port);

    const oriadv1 = parseFloat(freight.Transit_advanced_load) || 0;
    // const oriadv2 = parseFloat(freight.Transit_advanced_unit) || 0;
    const oriadv2 = parseFloat(
        freight.Transit_advanced_unitType === "1" ? 1 : freight.chargable_rate,
    );
    const oriadv3 = parseFloat(freight.Transit_advanced_gp) || 0;
    const oriadv4 = freight.Transit_advanced_unitType
        ? oriadv1 * oriadv2 * freight.Transit_advanced_unitTypeQTY
        : 0.0;
    let finalValueadv = 0;
    if (oriadv4 > 0) {
        finalValueadv = oriadv4 * (1 + oriadv3 / 100);
    }
    const final3rdadv1 = isNaN(finalValueadv) ? "0.00" : finalValueadv.toFixed(2);
    const finalvlaueotadv =
        final3rdadv1 * parseInt(freight?.Transit_advanced_gp_roe);

    const oridocumentation1 =
        parseFloat(freight.transit_change_Documentation) || 0;
    // const oridocumentation2 =
    //   parseFloat(freight.transit_change_Documentation_unit) || 0;
    const oridocumentation2 = parseFloat(
        freight.transit_change_Documentation_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    const oridocumentation3 =
        parseFloat(freight.transit_change_Documentation_gp) || 0;
    const oridocumentation4 = freight.transit_change_Documentation_unitType
        ? oridocumentation1 *
        oridocumentation2 *
        freight.transit_change_Documentation_unitTypeQTY
        : 0.0;
    let finalValuedocumantation = 0;
    if (oridocumentation4 > 0) {
        finalValuedocumantation = oridocumentation4 * (1 + oridocumentation3 / 100);
    }
    const final3rdocumantation1 = isNaN(finalValuedocumantation)
        ? "0.00"
        : finalValuedocumantation.toFixed(2);
    const finalvlaueotDocumantation =
        final3rdocumantation1 * parseInt(freight?.roe_transit_change_Documentation);

    const totalChageswithOuTransit =
        safeNumber(oritransit4) +
        safeNumber(oriunpack4) +
        safeNumber(ori3rdparty4) +
        safeNumber(ori3rdAdmin4) +
        safeNumber(ori3rdport4) +
        safeNumber(oridocumentation4) +
        safeNumber(oriadv4) +
        safeNumber(oriThc4);

    console.log(totalChageswithOutExchangeinsurance);

    const transitRoe =
        safeNumber(finalvlaueotDocumantation) +
        safeNumber(finalvlaueotransit) +
        safeNumber(finalvlaueotadv) +
        safeNumber(finalvlaueotfineal) +
        safeNumber(finalvlaueotfunpack) +
        safeNumber(finalvlaueot3dparty) +
        safeNumber(finalvlaueotAdmin) +
        safeNumber(finalvlaueotPort);

    // ////////////////////////////////////destination charge////////////////////////

    const destinationdocumentation1 =
        parseFloat(freight.Destination_freight_currency_cost) || 0;
    // const destinationdocumentation2 =
    //   parseFloat(freight.Destination_freight_currency_unit) || 0;
    const destinationdocumentation2 = parseFloat(
        freight.Destination_freight_currency_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    const destinationdocumentation3 =
        parseFloat(freight.Destination_freight_currency_gp) || 0;
    const destinationdocumentation4 =
        freight.Destination_freight_currency_unitType
            ? destinationdocumentation1 *
            destinationdocumentation2 *
            freight.Destination_freight_currency_unitTypeQTY
            : 0.0;
    let finalValuedestanion = 0;
    if (destinationdocumentation4 > 0) {
        finalValuedestanion =
            destinationdocumentation4 * (1 + destinationdocumentation3 / 100);
    }
    const final3rdestination1 = isNaN(finalValuedestanion)
        ? "0.00"
        : finalValuedestanion.toFixed(2);
    const final3rdestinationRoe =
        final3rdestination1 * parseInt(freight?.Destination_freight_currency_Roe);

    const destinationTHCdocumentation1 =
        parseFloat(freight.Destination_THC_currency_cost) || 0;
    // const destinationTHCdocumentation2 =
    //   parseFloat(freight.Destination_THC_currency_unit) || 0;
    const destinationTHCdocumentation2 = parseFloat(
        freight.Destination_THC_currency_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    const destinationTHCdocumentation3 =
        parseFloat(freight.Destination_THC_currency_gp) || 0;
    const destinationTHCdocumentation4 = freight.Destination_THC_currency_unitType
        ? destinationTHCdocumentation1 *
        destinationTHCdocumentation2 *
        freight.Destination_THC_currency_unitTypeQTY
        : 0.0;
    let finalValueTHCdestanion = 0;
    if (destinationTHCdocumentation4 > 0) {
        finalValueTHCdestanion =
            destinationTHCdocumentation4 * (1 + destinationTHCdocumentation3 / 100);
    }
    const final3rTHCdestination1 = isNaN(finalValueTHCdestanion)
        ? "0.00"
        : finalValueTHCdestanion.toFixed(2);
    const final3rTHCdestinationRoe =
        final3rTHCdestination1 * parseInt(freight?.Destination_THC_currency_Roe);

    const destinationUnpackdocumentation1 =
        parseFloat(freight.Destination_Unpack_currency_cost) || 0;
    // const destinationUnpackdocumentation2 =
    //   parseFloat(freight.Destination_Unpack_currency_unit) || 0;
    const destinationUnpackdocumentation2 = parseFloat(
        freight.Destination_Unpack_currency_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    const destinationUnpackdocumentation3 =
        parseFloat(freight.Destination_Unpack_currency_gp) || 0;
    const destinationUnpackdocumentation4 =
        freight.Destination_Unpack_currency_unitType
            ? destinationUnpackdocumentation1 *
            destinationUnpackdocumentation2 *
            freight.Destination_Unpack_currency_unitTypeQTY
            : 0.0;
    let finalValueUnpackdestanion = 0;
    if (destinationUnpackdocumentation4 > 0) {
        finalValueUnpackdestanion =
            destinationUnpackdocumentation4 *
            (1 + destinationUnpackdocumentation3 / 100);
    }
    const final3runpackdestination1 = isNaN(finalValueUnpackdestanion)
        ? "0.00"
        : finalValueUnpackdestanion.toFixed(2);
    const final3rUnpackdestinationRoe =
        final3runpackdestination1 *
        parseInt(freight?.Destination_Unpack_currency_roe);

    const destinationfuelsurchargedocumentation1 =
        parseFloat(freight.Destination_fuelsurcharge_currency_cost) || 0;
    // const destinationfuelsurchargedocumentation2 =
    // parseFloat(freight.Destination_fuelsurcharge_currency_unit) || 0;
    const destinationfuelsurchargedocumentation2 = parseFloat(
        freight.Destination_fuelsurcharge_currency_typeUnit === "1"
            ? 1
            : freight.chargable_rate,
    );
    const destinationfuelsurchargedocumentation3 =
        parseFloat(freight.Destination_fuelsurcharge_currency_gp) || 0;
    const destinationfuelsurchargedocumentation4 =
        freight.Destination_fuelsurcharge_currency_typeUnit
            ? destinationfuelsurchargedocumentation1 *
            destinationfuelsurchargedocumentation2 *
            freight.Destination_fuelsurcharge_currency_typeUnitQTY
            : 0.0;
    let finalValueFulesurchargedestanion = 0;
    if (destinationfuelsurchargedocumentation4 > 0) {
        finalValueFulesurchargedestanion =
            destinationfuelsurchargedocumentation4 *
            (1 + destinationfuelsurchargedocumentation3 / 100);
    }
    const final3rfuelsurchargedestination1 = isNaN(
        finalValueFulesurchargedestanion,
    )
        ? "0.00"
        : finalValueFulesurchargedestanion.toFixed(2);
    const final3rfuelsurCahrgeestinationRoe =
        final3rfuelsurchargedestination1 *
        parseInt(freight?.Destination_fuelsurcharge_currency_roe);

    const destinatiadminsurcharge1 =
        parseFloat(freight.Destination_adminsurcharge_currency_cost) || 0;
    const destinatiadminsurcharge2 = parseFloat(
        freight.Destination_adminsurcharge_currency_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    // const destinatiadminsurcharge2 =
    //   parseFloat(freight.Destination_adminsurcharge_currency_unit) || 0;
    const destinatiadminsurcharge3 =
        parseFloat(freight.Destination_adminsurcharge_currency_gp) || 0;
    const destinatiadminsurcharge4 =
        freight.Destination_adminsurcharge_currency_unitType
            ? destinatiadminsurcharge1 *
            destinatiadminsurcharge2 *
            freight.Destination_adminsurcharge_currency_unitTypeQTY
            : 0.0;
    let finalValueadminsurchargedestanion = 0;
    if (destinatiadminsurcharge4 > 0) {
        finalValueadminsurchargedestanion =
            destinatiadminsurcharge4 * (1 + destinatiadminsurcharge3 / 100);
    }
    const Valueadminsurchargedestanion = isNaN(finalValueadminsurchargedestanion)
        ? "0.00"
        : finalValueadminsurchargedestanion.toFixed(2);
    const adminsurcharge2 =
        Valueadminsurchargedestanion *
        parseInt(freight?.Destination_adminsurcharge_currency_roe);

    const destinatiportcargo1 =
        parseFloat(freight.Destination_portcargo_currency_cost) || 0;
    const destinatiportcargo2 = parseFloat(
        freight.Destination_portcargo_currency_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    // const destinatiportcargo2 =
    //   parseFloat(freight.Destination_portcargo_currency_unit) || 0;
    const destinatiportcargo3 =
        parseFloat(freight.Destination_portcargo_currency_gp) || 0;
    const destinatiportcargo4 = freight.Destination_portcargo_currency_unitType
        ? destinatiportcargo1 *
        destinatiportcargo2 *
        freight.Destination_portcargo_currency_unitTypeQTY
        : 0.0;
    let finalValueportcargostanion = 0;
    if (destinatiportcargo4 > 0) {
        finalValueportcargostanion =
            destinatiportcargo4 * (1 + destinatiportcargo3 / 100);
    }
    const Vaportcargoion = isNaN(finalValueportcargostanion)
        ? "0.00"
        : finalValueportcargostanion.toFixed(2);
    const admiportcargo2 =
        Vaportcargoion * parseInt(freight?.Destination_portcargo_currency_roe);

    const destinatiAdvancedLoad1 =
        parseFloat(freight.Destination_AdvancedLoad_currency_cost) || 0;
    // const destinatiAdvancedLoad2 =
    //   parseFloat(freight.Destination_AdvancedLoad_currency_unit) || 0;
    const destinatiAdvancedLoad2 = parseFloat(
        freight.Destination_AdvancedLoad_currency_unitType === "1"
            ? 1
            : freight.chargable_rate,
    );
    const destinatiAdvancedLoad3 =
        parseFloat(freight.Destination_AdvancedLoad_currency_gp) || 0;
    const destinatiAdvancedLoad4 =
        destinatiAdvancedLoad1 *
        destinatiAdvancedLoad2 *
        freight.Destination_AdvancedLoad_currency_unitTypeQTY;
    let finalValueAdvancedLoadstanion = 0;
    if (destinatiAdvancedLoad4 > 0) {
        finalValueAdvancedLoadstanion =
            destinatiAdvancedLoad4 * (1 + destinatiAdvancedLoad3 / 100);
    }
    const VAdvancedLoadion = isNaN(finalValueAdvancedLoadstanion)
        ? "0.00"
        : finalValueAdvancedLoadstanion.toFixed(2);
    const desdvancedLoadion =
        VAdvancedLoadion * parseInt(freight?.Destination_AdvancedLoad_currency_roe);

    const destinati3rdpartyDesc1 =
        parseFloat(freight.Destination_3rdpartyDesc_currency_cost) || 0;
    const destinati3rdpartyDesc2 =
        // parseFloat(freight.Destination_3rdpartyDesc_currency_unit) || 0;
        parseFloat(
            freight.Destination_3rdpartyDesc_currency_unitType === "1"
                ? 1
                : freight.chargable_rate,
        );
    const destinati3rdpartyDesc3 =
        parseFloat(freight.Destination_3rdpartyDesc_currency_gp) || 0;
    const destinati3rdpartyload4 =
        freight.Destination_3rdpartyDesc_currency_unitType
            ? destinati3rdpartyDesc1 *
            destinati3rdpartyDesc2 *
            freight.Destination_3rdpartyDesc_currency_unitTypeQTY
            : 0.0;
    let finalValue3rdpartyloadstanion = 0;
    if (destinati3rdpartyload4 > 0) {
        finalValue3rdpartyloadstanion =
            destinati3rdpartyload4 * (1 + destinati3rdpartyDesc3 / 100);
    }
    const VAdvanced3rdpartyLoadion = isNaN(finalValue3rdpartyloadstanion)
        ? "0.00"
        : finalValue3rdpartyloadstanion.toFixed(2);
    const desdva3rdpartyion =
        VAdvanced3rdpartyLoadion *
        parseInt(freight?.Destination_3rdpartyDesc_currency_roe);

    const destindeliveryyDesc1 =
        parseFloat(freight.Destination_delivery_currency_cost) || 0;
    const destindeliveryyDesc2 =
        // parseFloat(freight.Destination_delivery_currency_unit) || 0;
        parseFloat(
            freight.Destination_delivery_currency_unitType === "1"
                ? 1
                : freight.chargable_rate,
        );

    const destindeliveryyDesc3 =
        parseFloat(freight.Destination_delivery_currency_gp) || 0;
    const destindeliveryyDesc4 = freight.Destination_delivery_currency_unitType
        ? destindeliveryyDesc1 *
        destindeliveryyDesc2 *
        freight.Destination_delivery_currency_unitTypeQTY
        : 0.0;
    let finaldeliveryrtyloadstanion = 0;
    if (destindeliveryyDesc4 > 0) {
        finaldeliveryrtyloadstanion =
            destindeliveryyDesc4 * (1 + destindeliveryyDesc3 / 100);
    }
    const VAdvandeliverytyLoadion = isNaN(finaldeliveryrtyloadstanion)
        ? "0.00"
        : finaldeliveryrtyloadstanion.toFixed(2);
    const desddeliverytyion =
        VAdvandeliverytyLoadion *
        parseInt(freight?.Destination_delivery_currency_roe);

    const destindfuelchangerDesc1 =
        parseFloat(freight.Destination_fuelcharge_currency_cost) || 0;
    const destindfuelchangerDesc2 =
        // parseFloat(freight.Destination_fuelcharge_currency_unit) || 0;
        parseFloat(
            freight.Destination_fuelcharge_currency_unitType === "1"
                ? 1
                : freight.chargable_rate,
        );
    const destindfuelchangerDesc3 =
        parseFloat(freight.Destination_fuelcharge_currency_gp) || 0;
    const destindfuelchangerDesc4 =
        freight.Destination_fuelcharge_currency_unitType
            ? destindfuelchangerDesc1 *
            destindfuelchangerDesc2 *
            freight.Destination_fuelcharge_currency_unitTypeQTY
            : 0.0;
    let finalfuelchangertyloadstanion = 0;
    if (destindfuelchangerDesc4 > 0) {
        finalfuelchangertyloadstanion =
            destindfuelchangerDesc4 * (1 + destindfuelchangerDesc3 / 100);
    }
    const VAdvfuelchangeon = isNaN(finalfuelchangertyloadstanion)
        ? "0.00"
        : finalfuelchangertyloadstanion.toFixed(2);
    const defuelchangyion =
        VAdvfuelchangeon * parseInt(freight?.Destination_fuelcharge_currency_roe);

    const totalChaDestinationTransit =
        safeNumber(destinationdocumentation4) +
        safeNumber(destinationTHCdocumentation4) +
        safeNumber(destinationUnpackdocumentation4) +
        safeNumber(destinationfuelsurchargedocumentation4) +
        safeNumber(destinatiadminsurcharge4) +
        safeNumber(destinatiportcargo4) +
        safeNumber(destinatiAdvancedLoad4) +
        safeNumber(destinati3rdpartyload4) +
        safeNumber(destindeliveryyDesc4) +
        safeNumber(destindfuelchangerDesc4);

    console.log(totalChageswithOutExchangeinsurance);

    const totalChaDestinationTransitRoe =
        safeNumber(finalvlaueotDocumantation) +
        safeNumber(final3rdestinationRoe) +
        safeNumber(final3rTHCdestinationRoe) +
        safeNumber(final3rUnpackdestinationRoe) +
        safeNumber(final3rfuelsurCahrgeestinationRoe) +
        safeNumber(adminsurcharge2) +
        safeNumber(admiportcargo2) +
        safeNumber(desdvancedLoadion) +
        safeNumber(desdva3rdpartyion) +
        safeNumber(desddeliverytyion);

    // /////////////////////////////////admin calculation/////////////////////////////

    const deadminAgencyesc1 =
        parseFloat(freight.Destination_AdminAgrncy_currency_cost) || 0;
    const deadminAgencyesc2 =
        // parseFloat(freight.Destination_AdminAgrncy_currency_unit) || 0;
        parseFloat(
            freight.Destination_AdminAgrncy_currency_unitType === "1"
                ? 1
                : freight.chargable_rate,
        );
    const deadminAgencyesc3 =
        parseFloat(freight.Destination_AdminAgrncy_currency_gp) || 0;
    const deadminAgencyesc4 = freight.Destination_AdminAgrncy_currency_unitType
        ? deadminAgencyesc1 *
        deadminAgencyesc2 *
        freight.Destination_AdminAgrncy_currency_unitQTY
        : 0.0;
    let finaldminAgencyestanion = 0;
    if (deadminAgencyesc4 > 0) {
        finaldminAgencyestanion = deadminAgencyesc4 * (1 + deadminAgencyesc3 / 100);
    }
    const VAadminAgencyngeon = isNaN(finaldminAgencyestanion)
        ? "0.00"
        : finaldminAgencyestanion.toFixed(2);
    const defuelchdminAgencyngangyion =
        VAadminAgencyngeon *
        parseInt(freight?.Destination_AdminAgrncy_currency_roe);

    const deaddisbursemantc1 =
        parseFloat(freight.Destination_disbursemant_currency_cost) || 0;
    const deaddisbursemantc2 =
        // parseFloat(freight.Destination_disbursemant_currency_unit) || 0;
        parseFloat(
            freight.Destination_disbursemant_currenc_unitType1 === "1"
                ? 1
                : freight.chargable_rate,
        );
    const deaddisbursemantc3 =
        parseFloat(freight.Destination_disbursemant_currency_gp) || 0;
    const deaddisbursemantc4 = freight.Destination_disbursemant_currenc_unitType1
        ? deaddisbursemantc1 *
        deaddisbursemantc2 *
        freight.Destination_disbursemant_currency_unitTypeQTY
        : 0.0;
    let finaladdisbursematanion = 0;
    if (deaddisbursemantc4 > 0) {
        finaladdisbursematanion =
            deaddisbursemantc4 * (1 + deaddisbursemantc3 / 100);
    }
    const VAdisbursemon = isNaN(finaladdisbursematanion)
        ? "0.00"
        : finaladdisbursematanion.toFixed(2);
    const dedisbursementon =
        VAdisbursemon * parseInt(freight?.Destination_disbursemant_currency_roe);

    const deadoctc1 = parseFloat(freight.Destination_doc_currency_cost) || 0;
    const deadoctc2 = parseFloat(
        freight.Destination_doc_currency_unittype === "1"
            ? 1
            : freight.chargable_rate,
    );
    // const deadoctc2 = parseFloat(freight.Destination_doc_currency_unit) || 0;
    const deadoctc3 = parseFloat(freight.Destination_doc_currency_gp) || 0;
    const deadoctc4 = freight.Destination_doc_currency_unittype
        ? deadoctc1 * deadoctc2 * freight.Destination_doc_currency_unittypeQTY
        : 0.0;
    let finaadoctnion = 0;
    if (deadoctc4 > 0) {
        finaadoctnion = deadoctc4 * (1 + deadoctc3 / 100);
    }
    const VAdocon = isNaN(finaadoctnion) ? "0.00" : finaadoctnion.toFixed(2);
    const dedisbudoon = VAdocon * parseInt(freight?.Destination_doc_currency_roe);

    const totaAdminransit =
        safeNumber(deadminAgencyesc4) +
        safeNumber(deaddisbursemantc4) +
        safeNumber(deadoctc4);

    console.log(totalChageswithOutExchangeinsurance);

    const totalAdminnsitRoe =
        safeNumber(defuelchdminAgencyngangyion) +
        safeNumber(dedisbursementon) +
        safeNumber(dedisbudoon);

    const sumofall =
        totaAdminransit +
        totalChaDestinationTransit +
        totalChageswithOuTransit +
        totalChageswithOutExchangeinsurance +
        totalChageswithOutExchange;

    const sumofRoe =
        totalAdminnsitRoe +
        totalChaDestinationTransitRoe +
        transitRoe +
        totalChangeRoeOriginaftercalcuinsurance +
        totalChangeRoeOrigin;

    const invoiceBreakups = {
        org_pickUp: calculateInvoiceBreakup(finalvlaueoriginPickup, freight["org_pickUp_disc%"], freight.org_pickUp_vatTyp),
        origin_fuelSur: calculateInvoiceBreakup(finalvlaueoFuel, freight["origin_fuelSur_disc%"], freight.origin_fuelSur_vatTyp),
        origin_cfs: calculateInvoiceBreakup(finalvlaueocfs, freight["origin_cfs_disc%"], freight.origin_cfs_vatTyp),
        org_docFee: calculateInvoiceBreakup(finalvlaueodoc, freight["org_docFee_disc%"], freight.org_docFee_vatTyp),
        org_forwFee: calculateInvoiceBreakup(finalvlaueoforewarding, freight["org_forwFee_disc%"], freight.org_forwFee_vatTyp),
        org_clearance: calculateInvoiceBreakup(finalvlaueoCustomes, freight["org_clearance_disc%"], freight.org_clearance_vatTyp),
        ocenfreight_charge: calculateInvoiceBreakup(finalvlaueofreight, freight["ocenfreight_charge_disc%"], freight.ocenfreight_charge_vatTyp),
        insurance: calculateInvoiceBreakup(finalvlaueoInsurance, freight["insurance_disc%"], freight.insurance_vatTyp),
        trans_clear_fees: calculateInvoiceBreakup(finalvlaueotransit, freight["trans_clear_fees_disc%"], freight.trans_clear_fees_vatTyp),
        trans_THC_levy: calculateInvoiceBreakup(finalvlaueotfineal, freight["trans_THC_levy_disc%"], freight.trans_THC_levy_vatTyp),
        trans_unpack_charg: calculateInvoiceBreakup(finalvlaueotfunpack, freight["trans_unpack_charg_disc%"], freight.trans_unpack_charg_vatTyp),
        trans_CFS_charg: calculateInvoiceBreakup(finalvlaueot3dparty, freight["trans_CFS_charg_disc%"], freight.trans_CFS_charg_vatTyp),
        trans_admin_charg: calculateInvoiceBreakup(finalvlaueotAdmin, freight["trans_admin_charg_disc%"], freight.trans_admin_charg_vatTyp),
        trans_portCargo: calculateInvoiceBreakup(finalvlaueotPort, freight["trans_portCargo_disc%"], freight.trans_portCargo_vatTyp),
        trans_adv_loadHouse: calculateInvoiceBreakup(finalvlaueotadv, freight["trans_adv_loadHouse_disc%"], freight.trans_adv_loadHouse_vatTyp),
        trans_doc_fee: calculateInvoiceBreakup(finalvlaueotDocumantation, freight["trans_doc_fee_disc%"], freight.trans_doc_fee_vatTyp),
        dest_clearing_fees: calculateInvoiceBreakup(final3rdestinationRoe, freight["dest_clearing_fees_disc%"], freight.dest_clearing_fees_vatTyp),
        dest_THC_levy: calculateInvoiceBreakup(final3rTHCdestinationRoe, freight["dest_THC_levy_disc%"], freight.dest_THC_levy_vatTyp),
        dest_unpack_chrg: calculateInvoiceBreakup(final3rUnpackdestinationRoe, freight["dest_unpack_chrg_disc%"], freight.dest_unpack_chrg_vatTyp),
        dest_fuel_Surchar: calculateInvoiceBreakup(final3rfuelsurCahrgeestinationRoe, freight["dest_fuel_Surchar_disc%"], freight.dest_fuel_Surchar_vatTyp),
        dest_admin_chrg: calculateInvoiceBreakup(adminsurcharge2, freight["dest_admin_chrg_disc%"], freight.dest_admin_chrg_vatTyp),
        dest_portCargo: calculateInvoiceBreakup(admiportcargo2, freight["dest_portCargo_disc%"], freight.dest_portCargo_vatTyp),
        dest_adv_loadHouse: calculateInvoiceBreakup(desdvancedLoadion, freight["dest_adv_loadHouse_disc%"], freight.dest_adv_loadHouse_vatTyp),
        dest_CFS_charg: calculateInvoiceBreakup(desdva3rdpartyion, freight["dest_CFS_charg_disc%"], freight.dest_CFS_charg_vatTyp),
        dest_delivry_charge: calculateInvoiceBreakup(desddeliverytyion, freight["dest_delivry_charge_disc%"], freight.dest_delivry_charge_vatTyp),
        dest_fuel_surchrg: calculateInvoiceBreakup(defuelchangyion, freight["dest_fuel_surchrg_disc%"], freight.dest_fuel_surchrg_vatTyp),
        admin_agencyFee: calculateInvoiceBreakup(defuelchdminAgencyngangyion, freight["admin_agencyFee_disc%"], freight.admin_agencyFee_vatTyp),
        admin_disbur_fee: calculateInvoiceBreakup(dedisbursementon, freight["admin_disbur_fee_disc%"], freight.admin_disbur_fee_vatTyp),
        admin_doc_adminFees: calculateInvoiceBreakup(dedisbudoon, freight["admin_doc_adminFees_disc%"], freight.admin_doc_adminFees_vatTyp),
        cust_duty: calculateInvoiceBreakup(customChargeRows.cust_duty.finalAmt, freight["cust_duty_disc%"], freight.cust_duty_vatTyp),
        cust_vat: calculateInvoiceBreakup(customChargeRows.cust_vat.finalAmt, freight["cust_vat_disc%"], freight.cust_vat_vatTyp),
        adv_duty: calculateInvoiceBreakup(customChargeRows.adv_duty.finalAmt, freight["adv_duty_disc%"], freight.adv_duty_vatTyp),
        cust_penalty: calculateInvoiceBreakup(customChargeRows.cust_penalty.finalAmt, freight["cust_penalty_disc%"], freight.cust_penalty_vatTyp),
        custProv_pay: calculateInvoiceBreakup(customChargeRows.custProv_pay.finalAmt, freight["custProv_pay_disc%"], freight.custProv_pay_vatTyp),
        clearing_fee: calculateInvoiceBreakup(customChargeRows.clearing_fee.finalAmt, freight["clearing_fee_disc%"], freight.clearing_fee_vatTyp),
        disbursement: calculateInvoiceBreakup(customChargeRows.disbursement.finalAmt, freight["disbursement_disc%"], freight.disbursement_vatTyp),
        surcharge: calculateInvoiceBreakup(customChargeRows.surcharge.finalAmt, freight["surcharge_disc%"], freight.surcharge_vatTyp),
    };

    const totalVatInclusive = Object.values(invoiceBreakups).reduce(
        (sum, breakup) => sum + safeNumber(breakup?.inclusive),
        0,
    );

    const estimateCalculate = async () => {
        try {
            const payload = {
                freight_id: getdata.freight_id,
                client_id: getdata.client_ref,
                client_name: getdata.client_name,
                serial_number: freight.serial_number,
                date: update.date,
                client_ref: getdata.client_ref,
                product_desc: getdata.product_desc,
                type: getdata.type,
                freight: getdata.freight,
                user_type: user?.user_type,
                incoterm: getdata.incoterm,
                dimension: getdata.dimension,
                supplier_id: freight.supplier_id,
                weight: getdata.weight,

                origin_pick_up_cost: freight.origin_pick_up_cost,
                origin_pick_up_fees: freight.origin_pick_up_fees,
                origin_pickup_fee_gpcalc: freight.origin_pickup_fee_gpcalc,
                roe_origin_currencyorigin: freight.roe_origin_currencyorigin,
                finalvlaueoriginPickup: finalvlaueoriginPickup,
                org_pickUp_disc: invoiceBreakups.org_pickUp.disc,
                org_pickUp_exclusive: invoiceBreakups.org_pickUp.exclusive,
                org_pickUp_vat: invoiceBreakups.org_pickUp.vat,
                org_pickUp_vatIncl: invoiceBreakups.org_pickUp.inclusive,
                org_pickUp_vatTyp: freight.org_pickUp_vatTyp,
                origin_fuelSur_disc_percent: freight["origin_fuelSur_disc%"],
                origin_fuelSur_disc: invoiceBreakups.origin_fuelSur.disc,
                origin_fuelSur_exclusive: invoiceBreakups.origin_fuelSur.exclusive,
                origin_fuelSur_vat: invoiceBreakups.origin_fuelSur.vat,
                origin_fuelSur_vatIncl: invoiceBreakups.origin_fuelSur.inclusive,
                origin_fuelSur_vatTyp: freight.origin_fuelSur_vatTyp,
                origin_cfs_disc_percent: freight["origin_cfs_disc%"],
                origin_cfs_disc: invoiceBreakups.origin_cfs.disc,
                origin_cfs_exclusive: invoiceBreakups.origin_cfs.exclusive,
                origin_cfs_vat: invoiceBreakups.origin_cfs.vat,
                origin_cfs_vatIncl: invoiceBreakups.origin_cfs.inclusive,
                origin_cfs_vatTyp: freight.origin_cfs_vatTyp,
                org_docFee_disc_percent: freight["org_docFee_disc%"],
                org_docFee_disc: invoiceBreakups.org_docFee.disc,
                org_docFee_exclusive: invoiceBreakups.org_docFee.exclusive,
                org_docFee_vat: invoiceBreakups.org_docFee.vat,
                org_docFee_vatIncl: invoiceBreakups.org_docFee.inclusive,
                org_docFee_vatTyp: freight.org_docFee_vatTyp,
                org_forwFee_disc_percent: freight["org_forwFee_disc%"],
                org_forwFee_disc: invoiceBreakups.org_forwFee.disc,
                org_forwFee_exclusive: invoiceBreakups.org_forwFee.exclusive,
                org_forwFee_vat: invoiceBreakups.org_forwFee.vat,
                org_forwFee_vatIncl: invoiceBreakups.org_forwFee.inclusive,
                org_forwFee_vatTyp: freight.org_forwFee_vatTyp,
                org_clearance_disc_percent: freight["org_clearance_disc%"],
                org_clearance_disc: invoiceBreakups.org_clearance.disc,
                org_clearance_exclusive: invoiceBreakups.org_clearance.exclusive,
                org_clearance_vat: invoiceBreakups.org_clearance.vat,
                org_clearance_vatIncl: invoiceBreakups.org_clearance.inclusive,
                org_clearance_vatTyp: freight.org_clearance_vatTyp,
                ocenfreight_charge_disc_percent: freight["ocenfreight_charge_disc%"],
                ocenfreight_charge_disc: invoiceBreakups.ocenfreight_charge.disc,
                ocenfreight_charge_exclusive: invoiceBreakups.ocenfreight_charge.exclusive,
                ocenfreight_charge_vat: invoiceBreakups.ocenfreight_charge.vat,
                ocenfreight_charge_vatIncl: invoiceBreakups.ocenfreight_charge.inclusive,
                ocenfreight_charge_vatTyp: freight.ocenfreight_charge_vatTyp,
                insurance_disc_percent: freight["insurance_disc%"],
                insurance_disc: invoiceBreakups.insurance.disc,
                insurance_exclusive: invoiceBreakups.insurance.exclusive,
                insurance_vat: invoiceBreakups.insurance.vat,
                insurance_vatIncl: invoiceBreakups.insurance.inclusive,
                origin_pick_up_documantation_cost: freight.origin_pick_up_documantation_cost,
                insurance_vatTyp: freight.insurance_vatTyp,
                trans_clear_fees_disc_percent: freight["trans_clear_fees_disc%"],
                trans_clear_fees_disc: invoiceBreakups.trans_clear_fees.disc,
                trans_clear_fees_exclusive: invoiceBreakups.trans_clear_fees.exclusive,
                trans_clear_fees_vat: invoiceBreakups.trans_clear_fees.vat,
                trans_clear_fees_vatIncl: invoiceBreakups.trans_clear_fees.inclusive,
                trans_clear_fees_vatTyp: freight.trans_clear_fees_vatTyp,
                trans_THC_levy_disc_percent: freight["trans_THC_levy_disc%"],
                trans_THC_levy_disc: invoiceBreakups.trans_THC_levy.disc,
                trans_THC_levy_exclusive: invoiceBreakups.trans_THC_levy.exclusive,
                trans_THC_levy_vat: invoiceBreakups.trans_THC_levy.vat,
                trans_THC_levy_vatIncl: invoiceBreakups.trans_THC_levy.inclusive,
                trans_THC_levy_vatTyp: freight.trans_THC_levy_vatTyp,
                trans_unpack_charg_disc_percent: freight["trans_unpack_charg_disc%"],
                trans_unpack_charg_disc: invoiceBreakups.trans_unpack_charg.disc,
                trans_unpack_charg_exclusive: invoiceBreakups.trans_unpack_charg.exclusive,
                trans_unpack_charg_vat: invoiceBreakups.trans_unpack_charg.vat,
                trans_unpack_charg_vatIncl: invoiceBreakups.trans_unpack_charg.inclusive,
                trans_unpack_charg_vatTyp: freight.trans_unpack_charg_vatTyp,
                trans_CFS_charg_disc_percent: freight["trans_CFS_charg_disc%"],
                trans_CFS_charg_disc: invoiceBreakups.trans_CFS_charg.disc,
                trans_CFS_charg_exclusive: invoiceBreakups.trans_CFS_charg.exclusive,
                trans_CFS_charg_vat: invoiceBreakups.trans_CFS_charg.vat,
                trans_CFS_charg_vatIncl: invoiceBreakups.trans_CFS_charg.inclusive,
                trans_CFS_charg_vatTyp: freight.trans_CFS_charg_vatTyp,
                trans_admin_charg_disc_percent: freight["trans_admin_charg_disc%"],
                trans_admin_charg_disc: invoiceBreakups.trans_admin_charg.disc,
                trans_admin_charg_exclusive: invoiceBreakups.trans_admin_charg.exclusive,
                trans_admin_charg_vat: invoiceBreakups.trans_admin_charg.vat,
                trans_admin_charg_vatIncl: invoiceBreakups.trans_admin_charg.inclusive,
                trans_admin_charg_vatTyp: freight.trans_admin_charg_vatTyp,
                trans_portCargo_disc_percent: freight["trans_portCargo_disc%"],
                trans_portCargo_disc: invoiceBreakups.trans_portCargo.disc,
                trans_portCargo_exclusive: invoiceBreakups.trans_portCargo.exclusive,
                trans_portCargo_vat: invoiceBreakups.trans_portCargo.vat,
                trans_portCargo_vatIncl: invoiceBreakups.trans_portCargo.inclusive,
                trans_portCargo_vatTyp: freight.trans_portCargo_vatTyp,
                trans_adv_loadHouse_disc_percent: freight["trans_adv_loadHouse_disc%"],
                trans_adv_loadHouse_disc: invoiceBreakups.trans_adv_loadHouse.disc,
                trans_adv_loadHouse_exclusive: invoiceBreakups.trans_adv_loadHouse.exclusive,
                trans_adv_loadHouse_vat: invoiceBreakups.trans_adv_loadHouse.vat,
                trans_adv_loadHouse_vatIncl: invoiceBreakups.trans_adv_loadHouse.inclusive,
                trans_adv_loadHouse_vatTyp: freight.trans_adv_loadHouse_vatTyp,
                trans_doc_fee_disc_percent: freight["trans_doc_fee_disc%"],
                trans_doc_fee_disc: invoiceBreakups.trans_doc_fee.disc,
                trans_doc_fee_exclusive: invoiceBreakups.trans_doc_fee.exclusive,
                trans_doc_fee_vat: invoiceBreakups.trans_doc_fee.vat,
                trans_doc_fee_vatIncl: invoiceBreakups.trans_doc_fee.inclusive,
                trans_doc_fee_vatTyp: freight.trans_doc_fee_vatTyp,
                dest_clearing_fees_disc_percent: freight["dest_clearing_fees_disc%"],
                dest_clearing_fees_disc: invoiceBreakups.dest_clearing_fees.disc,
                dest_clearing_fees_exclusive: invoiceBreakups.dest_clearing_fees.exclusive,
                dest_clearing_fees_vat: invoiceBreakups.dest_clearing_fees.vat,
                dest_clearing_fees_vatIncl: invoiceBreakups.dest_clearing_fees.inclusive,
                dest_clearing_fees_vatTyp: freight.dest_clearing_fees_vatTyp,
                dest_THC_levy_disc_percent: freight["dest_THC_levy_disc%"],
                dest_THC_levy_disc: invoiceBreakups.dest_THC_levy.disc,
                dest_THC_levy_exclusive: invoiceBreakups.dest_THC_levy.exclusive,
                dest_THC_levy_vat: invoiceBreakups.dest_THC_levy.vat,
                dest_THC_levy_vatIncl: invoiceBreakups.dest_THC_levy.inclusive,
                dest_THC_levy_vatTyp: freight.dest_THC_levy_vatTyp,
                dest_unpack_chrg_disc_percent: freight["dest_unpack_chrg_disc%"],
                dest_unpack_chrg_disc: invoiceBreakups.dest_unpack_chrg.disc,
                dest_unpack_chrg_exclusive: invoiceBreakups.dest_unpack_chrg.exclusive,
                dest_unpack_chrg_vat: invoiceBreakups.dest_unpack_chrg.vat,
                dest_unpack_chrg_vatIncl: invoiceBreakups.dest_unpack_chrg.inclusive,
                dest_unpack_chrg_vatTyp: freight.dest_unpack_chrg_vatTyp,
                dest_fuel_Surchar_disc_percent: freight["dest_fuel_Surchar_disc%"],
                dest_fuel_Surchar_disc: invoiceBreakups.dest_fuel_Surchar.disc,
                dest_fuel_Surchar_exclusive: invoiceBreakups.dest_fuel_Surchar.exclusive,
                dest_fuel_Surchar_vat: invoiceBreakups.dest_fuel_Surchar.vat,
                dest_fuel_Surchar_vatIncl: invoiceBreakups.dest_fuel_Surchar.inclusive,
                dest_fuel_Surchar_vatTyp: freight.dest_fuel_Surchar_vatTyp,
                dest_admin_chrg_disc_percent: freight["dest_admin_chrg_disc%"],
                dest_admin_chrg_disc: invoiceBreakups.dest_admin_chrg.disc,
                dest_admin_chrg_exclusive: invoiceBreakups.dest_admin_chrg.exclusive,
                dest_admin_chrg_vat: invoiceBreakups.dest_admin_chrg.vat,
                dest_admin_chrg_vatIncl: invoiceBreakups.dest_admin_chrg.inclusive,
                dest_admin_chrg_vatTyp: freight.dest_admin_chrg_vatTyp,
                dest_portCargo_disc_percent: freight["dest_portCargo_disc%"],
                dest_portCargo_disc: invoiceBreakups.dest_portCargo.disc,
                dest_portCargo_exclusive: invoiceBreakups.dest_portCargo.exclusive,
                dest_portCargo_vat: invoiceBreakups.dest_portCargo.vat,
                dest_portCargo_vatIncl: invoiceBreakups.dest_portCargo.inclusive,
                dest_portCargo_vatTyp: freight.dest_portCargo_vatTyp,
                dest_adv_loadHouse_disc_percent: freight["dest_adv_loadHouse_disc%"],
                dest_adv_loadHouse_disc: invoiceBreakups.dest_adv_loadHouse.disc,
                dest_adv_loadHouse_exclusive: invoiceBreakups.dest_adv_loadHouse.exclusive,
                dest_adv_loadHouse_vat: invoiceBreakups.dest_adv_loadHouse.vat,
                dest_adv_loadHouse_vatIncl: invoiceBreakups.dest_adv_loadHouse.inclusive,
                dest_adv_loadHouse_vatTyp: freight.dest_adv_loadHouse_vatTyp,
                dest_CFS_charg_disc_percent: freight["dest_CFS_charg_disc%"],
                dest_CFS_charg_disc: invoiceBreakups.dest_CFS_charg.disc,
                dest_CFS_charg_exclusive: invoiceBreakups.dest_CFS_charg.exclusive,
                dest_CFS_charg_vat: invoiceBreakups.dest_CFS_charg.vat,
                dest_CFS_charg_vatIncl: invoiceBreakups.dest_CFS_charg.inclusive,
                dest_CFS_charg_vatTyp: freight.dest_CFS_charg_vatTyp,
                dest_delivry_charge_disc_percent: freight["dest_delivry_charge_disc%"],
                dest_delivry_charge_disc: invoiceBreakups.dest_delivry_charge.disc,
                dest_delivry_charge_exclusive: invoiceBreakups.dest_delivry_charge.exclusive,
                dest_delivry_charge_vat: invoiceBreakups.dest_delivry_charge.vat,
                dest_delivry_charge_vatIncl: invoiceBreakups.dest_delivry_charge.inclusive,
                dest_delivry_charge_vatTyp: freight.dest_delivry_charge_vatTyp,
                dest_fuel_surchrg_disc_percent: freight["dest_fuel_surchrg_disc%"],
                dest_fuel_surchrg_disc: invoiceBreakups.dest_fuel_surchrg.disc,
                dest_fuel_surchrg_exclusive: invoiceBreakups.dest_fuel_surchrg.exclusive,
                dest_fuel_surchrg_vat: invoiceBreakups.dest_fuel_surchrg.vat,
                dest_fuel_surchrg_vatIncl: invoiceBreakups.dest_fuel_surchrg.inclusive,
                dest_fuel_surchrg_vatTyp: freight.dest_fuel_surchrg_vatTyp,
                admin_agencyFee_disc_percent: freight["admin_agencyFee_disc%"],
                admin_agencyFee_disc: invoiceBreakups.admin_agencyFee.disc,
                admin_agencyFee_exclusive: invoiceBreakups.admin_agencyFee.exclusive,
                admin_agencyFee_vat: invoiceBreakups.admin_agencyFee.vat,
                admin_agencyFee_vatIncl: invoiceBreakups.admin_agencyFee.inclusive,
                admin_agencyFee_vatTyp: freight.admin_agencyFee_vatTyp,
                admin_disbur_fee_disc_percent: freight["admin_disbur_fee_disc%"],
                admin_disbur_fee_disc: invoiceBreakups.admin_disbur_fee.disc,
                admin_disbur_fee_exclusive: invoiceBreakups.admin_disbur_fee.exclusive,
                admin_disbur_fee_vat: invoiceBreakups.admin_disbur_fee.vat,
                admin_disbur_fee_vatIncl: invoiceBreakups.admin_disbur_fee.inclusive,
                admin_disbur_fee_vatTyp: freight.admin_disbur_fee_vatTyp,
                admin_doc_adminFees_disc_percent: freight["admin_doc_adminFees_disc%"],
                admin_doc_adminFees_disc: invoiceBreakups.admin_doc_adminFees.disc,
                admin_doc_adminFees_exclusive: invoiceBreakups.admin_doc_adminFees.exclusive,
                admin_doc_adminFees_vat: invoiceBreakups.admin_doc_adminFees.vat,
                admin_doc_adminFees_vatIncl: invoiceBreakups.admin_doc_adminFees.inclusive,
                admin_doc_adminFees_vatTyp: freight.admin_doc_adminFees_vatTyp,
                cust_duty_qty: freight.cust_duty_qty,
                cust_duty_curr: freight.cust_duty_curr,
                cust_duty_cost: freight.cust_duty_cost,
                cust_duty_unitTyp: freight.cust_duty_unitTyp,
                cust_duty_unit: customChargeRows.cust_duty.unit,
                cust_duty_TCost: customChargeRows.cust_duty.totalCost,
                cust_duty_roe: freight.cust_duty_roe,
                cust_duty_finalAmt: customChargeRows.cust_duty.finalAmt,
                cust_vat_qty: freight.cust_vat_qty,
                cust_vat_curr: freight.cust_vat_curr,
                cust_vat_cost: freight.cust_vat_cost,
                cust_vat_unitTyp: freight.cust_vat_unitTyp,
                cust_vat_unit: customChargeRows.cust_vat.unit,
                cust_vat_TCost: customChargeRows.cust_vat.totalCost,
                cust_vat_roe: freight.cust_vat_roe,
                cust_vat_finalAmt: customChargeRows.cust_vat.finalAmt,
                adv_duty_qty: freight.adv_duty_qty,
                adv_duty_curr: freight.adv_duty_curr,
                adv_duty_cost: freight.adv_duty_cost,
                adv_duty_unitTyp: freight.adv_duty_unitTyp,
                adv_duty_unit: customChargeRows.adv_duty.unit,
                adv_duty_TCost: customChargeRows.adv_duty.totalCost,
                adv_duty_roe: freight.adv_duty_roe,
                adv_duty_finalAmt: customChargeRows.adv_duty.finalAmt,
                cust_penalty_qty: freight.cust_penalty_qty,
                cust_penalty_curr: freight.cust_penalty_curr,
                cust_penalty_cost: freight.cust_penalty_cost,
                cust_penalty_unitTyp: freight.cust_penalty_unitTyp,
                cust_penalty_unit: customChargeRows.cust_penalty.unit,
                cust_penalty_TCost: customChargeRows.cust_penalty.totalCost,
                cust_penalty_roe: freight.cust_penalty_roe,
                cust_penalty_finalAmt: customChargeRows.cust_penalty.finalAmt,
                custProv_pay_qty: freight.custProv_pay_qty,
                custProv_pay_curr: freight.custProv_pay_curr,
                custProv_pay_cost: freight.custProv_pay_cost,
                custProv_pay_unitTyp: freight.custProv_pay_unitTyp,
                custProv_pay_unit: customChargeRows.custProv_pay.unit,
                custProv_pay_TCost: customChargeRows.custProv_pay.totalCost,
                custProv_pay_roe: freight.custProv_pay_roe,
                custProv_pay_finalAmt: customChargeRows.custProv_pay.finalAmt,
                clearing_fee_qty: freight.clearing_fee_qty,
                clearing_fee_curr: freight.clearing_fee_curr,
                clearing_fee_cost: freight.clearing_fee_cost,
                clearing_fee_unitTyp: freight.clearing_fee_unitTyp,
                clearing_fee_unit: customChargeRows.clearing_fee.unit,
                clearing_fee_TCost: customChargeRows.clearing_fee.totalCost,
                clearing_fee_roe: freight.clearing_fee_roe,
                clearing_fee_finalAmt: customChargeRows.clearing_fee.finalAmt,
                disbursement_qty: freight.disbursement_qty,
                disbursement_curr: freight.disbursement_curr,
                disbursement_cost: freight.disbursement_cost,
                disbursement_unitTyp: freight.disbursement_unitTyp,
                disbursement_unit: customChargeRows.disbursement.unit,
                disbursement_TCost: customChargeRows.disbursement.totalCost,
                disbursement_roe: freight.disbursement_roe,
                disbursement_finalAmt: customChargeRows.disbursement.finalAmt,
                surcharge_qty: freight.surcharge_qty,
                surcharge_curr: freight.surcharge_curr,
                surcharge_cost: freight.surcharge_cost,
                surcharge_unitTyp: freight.surcharge_unitTyp,
                surcharge_unit: customChargeRows.surcharge.unit,
                surcharge_TCost: customChargeRows.surcharge.totalCost,
                surcharge_roe: freight.surcharge_roe,
                surcharge_finalAmt: customChargeRows.surcharge.finalAmt,
                "cust_duty_disc%": freight["cust_duty_disc%"],
                cust_duty_disc: invoiceBreakups.cust_duty.disc,
                cust_duty_vatIncl: invoiceBreakups.cust_duty.inclusive,
                cust_duty_vatTyp: freight.cust_duty_vatTyp,
                "cust_vat_disc%": freight["cust_vat_disc%"],
                cust_vat_disc: invoiceBreakups.cust_vat.disc,
                cust_vat_vatIncl: invoiceBreakups.cust_vat.inclusive,
                cust_vat_vatTyp: freight.cust_vat_vatTyp,
                "adv_duty_disc%": freight["adv_duty_disc%"],
                adv_duty_disc: invoiceBreakups.adv_duty.disc,
                adv_duty_vatIncl: invoiceBreakups.adv_duty.inclusive,
                adv_duty_vatTyp: freight.adv_duty_vatTyp,
                "cust_penalty_disc%": freight["cust_penalty_disc%"],
                cust_penalty_disc: invoiceBreakups.cust_penalty.disc,
                cust_penalty_vatIncl: invoiceBreakups.cust_penalty.inclusive,
                cust_penalty_vatTyp: freight.cust_penalty_vatTyp,
                "custProv_pay_disc%": freight["custProv_pay_disc%"],
                custProv_pay_disc: invoiceBreakups.custProv_pay.disc,
                custProv_pay_vatIncl: invoiceBreakups.custProv_pay.inclusive,
                custProv_pay_vatTyp: freight.custProv_pay_vatTyp,
                "clearing_fee_disc%": freight["clearing_fee_disc%"],
                clearing_fee_disc: invoiceBreakups.clearing_fee.disc,
                clearing_fee_vatIncl: invoiceBreakups.clearing_fee.inclusive,
                clearing_fee_vatTyp: freight.clearing_fee_vatTyp,
                "disbursement_disc%": freight["disbursement_disc%"],
                disbursement_disc: invoiceBreakups.disbursement.disc,
                disbursement_vatIncl: invoiceBreakups.disbursement.inclusive,
                disbursement_vatTyp: freight.disbursement_vatTyp,
                "surcharge_disc%": freight["surcharge_disc%"],
                surcharge_disc: invoiceBreakups.surcharge.disc,
                surcharge_vatIncl: invoiceBreakups.surcharge.inclusive,
                surcharge_vatTyp: freight.surcharge_vatTyp,
                oripick4: oripick4,
                finalori1: finalori1,
                origin_pick_up_fuel_cost: freight.origin_pick_up_fuel_cost,
                origin_pick_up_fuel_fees: freight.origin_pick_up_fuel_fees,
                origin_pick_fuelGP: freight.origin_pick_fuelGP,
                pickup_freight_currency: freight.pickup_freight_currency,
                freight_charge_currency: freight.freight_charge_currency,
                Transit_currency: freight.Transit_currency,
                Destination_freight_currency: freight.Destination_freight_currency,
                admin_currency_charge: freight.admin_currency_charge,
                chargable_rate: freight.chargable_rate,
                orifuel4: orifuel4,
                finalfuel1: finalfuel1,
                roe_origin_fuel_currency: freight.roe_origin_fuel_currency,
                finalvlaueoFuel: finalvlaueoFuel,
                origin_pick_up_cfs_cost: freight.origin_pick_up_cfs_cost,
                origin_pick_up_cfs_fees: freight.origin_pick_up_cfs_fees,
                origin_pickup_vfs_gp: freight.origin_pickup_vfs_gp,
                oricfs4: oricfs4,
                finalcfs1: finalcfs1,
                roe_origin_cfs_currency: freight.roe_origin_cfs_currency,
                roe_freight_currency: freight.roe_freight_currency,
                finalvlaueocfs: finalvlaueocfs,
                origin_pick_up_documantation_cost:
                    freight.origin_pick_up_documantation_cost,
                origin_pick_up_documantation_fees:
                    freight.origin_pick_up_documantation_fees,
                origin_pick_documantation_cost_gp:
                    freight.origin_pick_documantation_cost_gp,
                oridoc4: oridoc4,
                finaldoc1: finaldoc1,
                roe_origin_doc_currency: freight.roe_origin_doc_currency,
                finalvlaueodoc: finalvlaueodoc,
                origin_pick_up_forewarding_cost:
                    freight.origin_pick_up_forewarding_cost,
                origin_pick_up_forewarding_fees:
                    freight.origin_pick_up_forewarding_fees,
                origin_pickup_forewarding_gp: freight.origin_pickup_forewarding_gp,
                oriforewarding4: oriforewarding4,
                roe_origin_forewarding: freight.roe_origin_forewarding,
                finalforewarding1: finalforewarding1,
                finalvlaueoforewarding: finalvlaueoforewarding,
                origin_pick_up_custome_cost: freight.origin_pick_up_custome_cost,
                origin_pick_up_custome_clearance:
                    freight.origin_pick_up_custome_clearance,
                origin_pickup_custome_gp: freight.origin_pickup_custome_gp,
                oricustome4: oricustome4,
                roe_origin_customes: freight.roe_origin_customes,
                finalcustomes1: finalcustomes1,
                finalvlaueoCustomes: finalvlaueoCustomes,
                totalChageswithOutExchange: totalChageswithOutExchange,
                totalChangeRoeOrigin: totalChangeRoeOrigin,
                freight_charge_currency_cost: freight.freight_charge_currency_cost,
                freight_charge_currency_fees: freight.freight_charge_currency_fees,
                freight_charge_currency_gp: freight.freight_charge_currency_gp,
                orifreight4: orifreight4,
                finalfreight1: finalfreight1,
                finalvlaueofreight: finalvlaueofreight,
                freight_currency_insurance_cost:
                    freight.freight_currency_insurance_cost,
                freight_currency_insurance_unit:
                    freight.freight_currency_insurance_unit,
                freightorigin_insurance_gp: freight.freightorigin_insurance_gp,
                oriinsurance4: oriinsurance4,
                roe_insurance_currency: freight.roe_insurance_currency,
                finalinsurance1: finalinsurance1,
                finalvlaueoInsurance: finalvlaueoInsurance,
                totalChageswithOutExchangeinsurance:
                    totalChageswithOutExchangeinsurance,
                totalChangeRoeOriginaftercalcuinsurance:
                    totalChangeRoeOriginaftercalcuinsurance,
                Transit_currency_Cost: freight.Transit_currency_Cost,
                Transit_currency_unit: freight.Transit_currency_unit,
                Transit_currency_gp: freight.Transit_currency_gp,
                Destination_disbursemant_currenc_unitType1:
                    freight.Destination_disbursemant_currenc_unitType1,
                Transit_currency_roe: freight.Transit_currency_roe,
                finaltransit1: finaltransit1,
                finalvlaueotransit: finalvlaueotransit,
                oritransit4: oritransit4,
                transit_currency_THC_cost: freight.transit_currency_THC_cost,
                transit_currency_THC_init: freight.transit_currency_THC_init,
                transit_currency_THC_gp: freight.transit_currency_THC_gp,
                roe_Transit_Thc: freight.roe_Transit_Thc,
                finalThc1: finalThc1,
                finalvlaueotfineal: finalvlaueotfineal,
                oriThc4: oriThc4,
                Transit_currency_unpack_cost: freight.Transit_currency_unpack_cost,
                Transit_currency_unpack_unit: freight.Transit_currency_unpack_unit,
                Transit_currency_unpack_gp: freight.Transit_currency_unpack_gp,
                Transit_unpack_roe: freight.Transit_unpack_roe,
                finalunpack1: finalunpack1,
                finalvlaueotfunpack: finalvlaueotfunpack,
                oriunpack4: oriunpack4,
                transit_3rd_party_cost: freight.transit_3rd_party_cost,
                transit_3rd_party_unit: freight.transit_3rd_party_unit,
                transit_3rd_party_gp: freight.transit_3rd_party_gp,
                ori3rdparty4: ori3rdparty4,
                final3rdparty1: final3rdparty1,
                finalvlaueot3dparty: finalvlaueot3dparty,
                transit_currency_3rd: freight.transit_currency_3rd,
                transit_admin_change: freight.transit_admin_change,
                transit_admin_unit: freight.transit_admin_unit,
                transit_admin_gp: freight.transit_admin_gp,
                ori3rdAdmin4: ori3rdAdmin4,
                final3rdAdmin1: final3rdAdmin1,
                finalvlaueotAdmin: finalvlaueotAdmin,
                roe_transit_admin: freight.roe_transit_admin,
                transit_currency_port: freight.transit_currency_port,
                transit_currency_port_unit: freight.transit_currency_port_unit,
                transit_currency_port_gp: freight.transit_currency_port_gp,
                ori3rdport4: ori3rdport4,
                final3rdport1: final3rdport1,
                finalvlaueotPort: finalvlaueotPort,
                roe_trans_port: freight.roe_trans_port,
                Transit_advanced_load: freight.Transit_advanced_load,
                Transit_advanced_unit: freight.Transit_advanced_unit,
                Transit_advanced_gp: freight.Transit_advanced_gp,
                Transit_advanced_gp_roe: freight.Transit_advanced_gp_roe,
                oriadv4: oriadv4,
                final3rdadv1: final3rdadv1,
                finalvlaueotadv: finalvlaueotadv,
                transit_change_Documentation: freight.transit_change_Documentation,
                transit_change_Documentation_unit:
                    freight.transit_change_Documentation_unit,
                transit_change_Documentation_gp:
                    freight.transit_change_Documentation_gp,
                roe_transit_change_Documentation:
                    freight.roe_transit_change_Documentation,
                oridocumentation4: oridocumentation4,
                final3rdocumantation1: final3rdocumantation1,
                finalvlaueotDocumantation: finalvlaueotDocumantation,
                totalChageswithOuTransit: totalChageswithOuTransit,
                transitRoe: transitRoe,
                Destination_freight_currency_cost:
                    freight.Destination_freight_currency_cost,
                Destination_freight_currency_unit:
                    freight.Destination_freight_currency_unit,
                Destination_freight_currency_gp:
                    freight.Destination_freight_currency_gp,
                destinationdocumentation4: destinationdocumentation4,
                final3rdestination1: final3rdestination1,
                final3rdestinationRoe: final3rdestinationRoe,
                Destination_freight_currency_Roe:
                    freight.Destination_freight_currency_Roe,

                Destination_THC_currency_cost: freight.Destination_THC_currency_cost,
                Destination_THC_currency_unit: freight.Destination_THC_currency_unit,
                Destination_THC_currency_gp: freight.Destination_THC_currency_gp,
                destinationTHCdocumentation4: destinationTHCdocumentation4,
                final3rTHCdestination1: final3rTHCdestination1,
                final3rTHCdestinationRoe: final3rTHCdestinationRoe,
                Destination_THC_currency_Roe: freight.Destination_THC_currency_Roe,
                Destination_Unpack_currency_cost:
                    freight.Destination_Unpack_currency_cost,
                Destination_Unpack_currency_unit:
                    freight.Destination_Unpack_currency_unit,
                Destination_Unpack_currency_gp: freight.Destination_Unpack_currency_gp,
                destinationUnpackdocumentation4: destinationUnpackdocumentation4,
                final3runpackdestination1: final3runpackdestination1,
                final3rUnpackdestinationRoe: final3rUnpackdestinationRoe,
                Destination_Unpack_currency_roe:
                    freight.Destination_Unpack_currency_roe,
                Destination_fuelsurcharge_currency_cost:
                    freight.Destination_fuelsurcharge_currency_cost,
                Destination_fuelsurcharge_currency_unit:
                    freight.Destination_fuelsurcharge_currency_unit,
                Destination_fuelsurcharge_currency_gp:
                    freight.Destination_fuelsurcharge_currency_gp,
                destinationfuelsurchargedocumentation4:
                    destinationfuelsurchargedocumentation4,
                final3rfuelsurchargedestination1: final3rfuelsurchargedestination1,
                final3rfuelsurCahrgeestinationRoe: final3rfuelsurCahrgeestinationRoe,
                Destination_fuelsurcharge_currency_roe:
                    freight.Destination_fuelsurcharge_currency_roe,
                Destination_adminsurcharge_currency_cost:
                    freight.Destination_adminsurcharge_currency_cost,
                Destination_adminsurcharge_currency_unit:
                    freight.Destination_adminsurcharge_currency_unit,
                Destination_adminsurcharge_currency_gp:
                    freight.Destination_adminsurcharge_currency_gp,
                destinatiadminsurcharge4: destinatiadminsurcharge4,
                Valueadminsurchargedestanion: Valueadminsurchargedestanion,
                adminsurcharge2: adminsurcharge2,
                Destination_adminsurcharge_currency_roe:
                    freight.Destination_adminsurcharge_currency_roe,
                Destination_portcargo_currency_cost:
                    freight.Destination_portcargo_currency_cost,
                Destination_portcargo_currency_unit:
                    freight.Destination_portcargo_currency_unit,
                Destination_portcargo_currency_gp:
                    freight.Destination_portcargo_currency_gp,
                destinatiportcargo4: destinatiportcargo4,
                Vaportcargoion: Vaportcargoion,
                admiportcargo2: admiportcargo2,
                Destination_portcargo_currency_roe:
                    freight.Destination_portcargo_currency_roe,
                Destination_AdvancedLoad_currency_cost:
                    freight.Destination_AdvancedLoad_currency_cost,
                Destination_AdvancedLoad_currency_unit:
                    freight.Destination_AdvancedLoad_currency_unit,
                Destination_AdvancedLoad_currency_gp:
                    freight.Destination_AdvancedLoad_currency_gp,
                destinatiAdvancedLoad4: destinatiAdvancedLoad4,
                VAdvancedLoadion: VAdvancedLoadion,
                desdvancedLoadion: desdvancedLoadion,
                Destination_AdvancedLoad_currency_roe:
                    freight.Destination_AdvancedLoad_currency_roe,
                Destination_3rdpartyDesc_currency_cost:
                    freight.Destination_3rdpartyDesc_currency_cost,
                Destination_3rdpartyDesc_currency_unit:
                    freight.Destination_3rdpartyDesc_currency_unit,
                Destination_3rdpartyDesc_currency_gp:
                    freight.Destination_3rdpartyDesc_currency_gp,
                destinati3rdpartyload4: destinati3rdpartyload4,
                VAdvanced3rdpartyLoadion: VAdvanced3rdpartyLoadion,
                desdva3rdpartyion: desdva3rdpartyion,
                Destination_3rdpartyDesc_currency_roe:
                    freight.Destination_3rdpartyDesc_currency_roe,
                Destination_delivery_currency_cost:
                    freight.Destination_delivery_currency_cost,
                Destination_delivery_currency_unit:
                    freight.Destination_delivery_currency_unit,
                Destination_delivery_currency_gp:
                    freight.Destination_delivery_currency_gp,
                destindeliveryyDesc4: destindeliveryyDesc4,
                VAdvandeliverytyLoadion: VAdvandeliverytyLoadion,
                desddeliverytyion: desddeliverytyion,
                Destination_delivery_currency_roe:
                    freight.Destination_delivery_currency_roe,
                Destination_fuelcharge_currency_cost:
                    freight.Destination_fuelcharge_currency_cost,
                Destination_fuelcharge_currency_unit:
                    freight.Destination_fuelcharge_currency_unit,
                Destination_fuelcharge_currency_gp:
                    freight.Destination_fuelcharge_currency_gp,
                destindfuelchangerDesc4: destindfuelchangerDesc4,
                VAdvfuelchangeon: VAdvfuelchangeon,
                defuelchangyion: defuelchangyion,
                Destination_fuelcharge_currency_roe:
                    freight.Destination_fuelcharge_currency_roe,
                totalChaDestinationTransit: totalChaDestinationTransit,
                totalChaDestinationTransitRoe: totalChaDestinationTransitRoe,
                Destination_AdminAgrncy_currency_cost:
                    freight.Destination_AdminAgrncy_currency_cost,
                Destination_AdminAgrncy_currency_unit:
                    freight.Destination_AdminAgrncy_currency_unit,
                Destination_AdminAgrncy_currency_gp:
                    freight.Destination_AdminAgrncy_currency_gp,
                deadminAgencyesc4: deadminAgencyesc4,
                // finaldminAgencyestanion: finaldminAgencyestanion,
                VAadminAgencyngeon: VAadminAgencyngeon,
                defuelchdminAgencyngangyion: defuelchdminAgencyngangyion,
                Destination_AdminAgrncy_currency_roe:
                    freight.Destination_AdminAgrncy_currency_roe,
                Destination_disbursemant_currency_cost:
                    freight.Destination_disbursemant_currency_cost,
                Destination_disbursemant_currency_unit:
                    freight.Destination_disbursemant_currency_unit,
                Destination_disbursemant_currency_gp:
                    freight.Destination_disbursemant_currency_gp,
                deaddisbursemantc4: deaddisbursemantc4,
                VAdisbursemon: VAdisbursemon,
                dedisbursementon: dedisbursementon,
                Destination_disbursemant_currency_roe:
                    freight.Destination_disbursemant_currency_roe,
                Destination_doc_currency_cost: freight.Destination_doc_currency_cost,
                Destination_doc_currency_unit: freight.Destination_doc_currency_unit,
                Destination_doc_currency_gp: freight.Destination_doc_currency_gp,
                deadoctc4: deadoctc4,
                VAdocon: VAdocon,
                dedisbudoon: dedisbudoon,
                Destination_doc_currency_roe: freight.Destination_doc_currency_roe,
                deadoctc4: deadoctc4,
                totaAdminransit: totaAdminransit,
                totalAdminnsitRoe: totalAdminnsitRoe,
                sumofall: sumofall,
                sumofRoe: sumofRoe,
                freight_charge_currencyQTY: freight.freight_charge_currencyQTY,
                origin_pick_up_fuel_unitTypeQTY:
                    freight.origin_pick_up_fuel_unitTypeQTY,
                origin_pick_up_cfs_unitTypeQTY: freight.origin_pick_up_cfs_unitTypeQTY,
                origin_pick_up_forewarding_unitTypeQTY:
                    freight.origin_pick_up_forewarding_unitTypeQTY,
                origin_pick_up_documantation_unitTypeQTY:
                    freight.origin_pick_up_documantation_unitTypeQTY,
                origin_pick_up_custome_unitTypeQTY:
                    freight.origin_pick_up_custome_unitTypeQTY,
                freight_charge_currency_unitTypeQTY:
                    freight.freight_charge_currency_unitTypeQTY,
                freight_currency_insurance_unittypeQTY:
                    freight.freight_currency_insurance_unittypeQTY,
                Transit_currency_unitTpeQTY: freight.Transit_currency_unitTpeQTY,
                transit_currency_THC_initTypeQTY:
                    freight.transit_currency_THC_initTypeQTY,
                transit_currency_THC_initTypeeQTY:
                    freight.transit_currency_THC_initTypeeQTY,
                transit_3rd_party_unittypeQTY: freight.transit_3rd_party_unittypeQTY,
                transit_admin_unittypeQTY: freight.transit_admin_unittypeQTY,
                transit_currency_port_unitTypeQTY:
                    freight.transit_currency_port_unitTypeQTY,
                Transit_advanced_unitTypeQTY: freight.Transit_advanced_unitTypeQTY,
                transit_change_Documentation_unitTypeQTY:
                    freight.transit_change_Documentation_unitTypeQTY,
                Destination_freight_currency_unitTypeQTY:
                    freight.Destination_freight_currency_unitTypeQTY,
                Destination_THC_currency_unitTypeQTY:
                    freight.Destination_THC_currency_unitTypeQTY,
                Destination_Unpack_currency_unitTypeQTY:
                    freight.Destination_Unpack_currency_unitTypeQTY,
                Destination_fuelsurcharge_currency_typeUnitQTY:
                    freight.Destination_fuelsurcharge_currency_typeUnitQTY,
                Destination_adminsurcharge_currency_unitTypeQTY:
                    freight.Destination_adminsurcharge_currency_unitTypeQTY,
                Destination_portcargo_currency_unitTypeQTY:
                    freight.Destination_portcargo_currency_unitTypeQTY,
                Destination_AdvancedLoad_currency_unitTypeQTY:
                    freight.Destination_AdvancedLoad_currency_unitTypeQTY,
                Destination_3rdpartyDesc_currency_unitTypeQTY:
                    freight.Destination_3rdpartyDesc_currency_unitTypeQTY,
                Destination_delivery_currency_unitTypeQTY:
                    freight.Destination_delivery_currency_unitTypeQTY,
                Destination_fuelcharge_currency_unitTypeQTY:
                    freight.Destination_fuelcharge_currency_unitTypeQTY,
                Destination_AdminAgrncy_currency_unitQTY:
                    freight.Destination_AdminAgrncy_currency_unitQTY,
                Destination_disbursemant_currency_unitTypeQTY:
                    freight.Destination_disbursemant_currency_unitTypeQTY,
                origin_pick_up_unitType: freight.origin_pick_up_unitType,
                origin_pick_up_fuel_unitType: freight.origin_pick_up_fuel_unitType,
                origin_pick_up_cfs_unitType: freight.origin_pick_up_cfs_unitType,
                origin_pick_up_forewarding_unitType:
                    freight.origin_pick_up_forewarding_unitType,
                origin_pick_up_documantation_unitType:
                    freight.origin_pick_up_documantation_unitType,
                origin_pick_up_custome_unitType:
                    freight.origin_pick_up_custome_unitType,
                freight_charge_currency_unitType:
                    freight.freight_charge_currency_unitType,
                freight_currency_insurance_unittype:
                    freight.freight_currency_insurance_unittype,
                Transit_currency_unitTpe: freight.Transit_currency_unitTpe,
                transit_currency_THC_initType: freight.transit_currency_THC_initType,
                Transit_currency_unpack_unitType:
                    freight.Transit_currency_unpack_unitType,
                transit_3rd_party_unittype: freight.transit_3rd_party_unittype,
                transit_admin_unittype: freight.transit_admin_unittype,
                transit_currency_port_unitType: freight.transit_currency_port_unitType,
                Transit_advanced_unitType: freight.Transit_advanced_unitType,
                transit_change_Documentation_unitType:
                    freight.transit_change_Documentation_unitType,
                Destination_freight_currency_unitType:
                    freight.Destination_freight_currency_unitType,
                Destination_THC_currency_unitType:
                    freight.Destination_THC_currency_unitType,
                Destination_Unpack_currency_unitType:
                    freight.Destination_Unpack_currency_unitType,
                Destination_fuelsurcharge_currency_typeUnit:
                    freight.Destination_fuelsurcharge_currency_typeUnit,
                Destination_adminsurcharge_currency_unitType:
                    freight.Destination_adminsurcharge_currency_unitType,
                Destination_portcargo_currency_unitType:
                    freight.Destination_portcargo_currency_unitType,
                Destination_AdvancedLoad_currency_unitType:
                    freight.Destination_AdvancedLoad_currency_unitType,
                Destination_3rdpartyDesc_currency_unitType:
                    freight.Destination_3rdpartyDesc_currency_unitType,
                Destination_delivery_currency_unitType:
                    freight.Destination_delivery_currency_unitType,
                Destination_fuelcharge_currency_unitType:
                    freight.Destination_fuelcharge_currency_unitType,
                Destination_AdminAgrncy_currency_unitType:
                    freight.Destination_AdminAgrncy_currency_unitType,
                Destination_doc_currency_unittype:
                    freight.Destination_doc_currency_unittype,
                Destination_AdminAgrncy_currency_unitType:
                    freight.Destination_AdminAgrncy_currency_unitType,
                Destination_doc_currency_unittypeQTY:
                    freight.Destination_doc_currency_unittypeQTY,
                ...((getdata.quote_estimate_id || quotationID) && {
                    quote_estimate_id: getdata.quote_estimate_id || quotationID,
                }),
                final_base_currency: freight.final_base_currency,
            };
            console.log("[Add Invoice] addEstimatSupplierInvoice payload:", payload);
            console.log(
                "[Add Invoice] payload keys count:",
                Object.keys(payload).length,
            );
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}addEstimateShippingQuote`,
                payload,
            );
            if (response.data.success === true) {
                navigate("/Admin/quotes");
                setQuotationID(response.data.ID)
                toast.success(response.data.message);
            } else {
                console.log("some thing went wrong");
            }
        } catch (error) {
            console.log("Full Error =>", error);
            console.log("Error Response =>", error.response);
            console.log("Error Data =>", error.response?.data);
            console.log("Error Message =>", error.message);
            console.log("Status Code =>", error.response?.status);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            {openmodal1 && (
                <div className="custom-modal">
                    <div className="custom-modal-content">
                        <div className="custom-modal-header">
                            <h5 className="bold">Select Supplier</h5>
                            <button className="btn-close" onClick={() => setOpenmodal1()}>
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="custom-modal-body">
                            <div style={{ margin: "20px" }}>
                                <select
                                    className="form-select"
                                    value={selected}
                                    onChange={(e) => setSelecSupplier(e.target.value)}
                                >
                                    <option value="">Select Supplier</option>
                                    {dat1.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {openmodal && (
                <div className="custom-modal">
                    <div className="custom-modal-content">
                        <div className="custom-modal-header">
                            <h5 className="bold">Select Freight</h5>

                            <button className="btn-close" onClick={() => closemodal()}>
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="custom-modal-body">
                            <div style={{ margin: "20px" }}>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={freightData.map(item => ({ value: item.freight_id, label: item.freight_number })).find(opt => opt.value === selected) || null}
                                    onChange={(option) => {
                                        const val = option ? option.value : "";
                                        setSelected(val);
                                        if (val) {
                                            getdataFreightById(val);
                                        }
                                    }}
                                    isClearable
                                    isSearchable
                                    name="freight"
                                    placeholder="Select Freight"
                                    options={freightData.map(item => ({ value: item.freight_id, label: item.freight_number }))}
                                />
                                <br />
                            </div>
                        </div>

                        {/* <div className="custom-modal-footer">
                            <button className="btn btn-primary" onClick={() => getdataFreightById(selected)}>
                                Add Freight
                            </button>
                        </div> */}
                    </div>
                </div>
            )}
            <div className="wpWrapper">
                <div className="container-fluid">
                    <div className=" ">
                        <div className=" ">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="d-flex">
                                            <ArrowBackIcon
                                                onClick={handleclicknav}
                                                style={{ cursor: "pointer" }}
                                            />
                                            <h4 className="freight_hd mb-0">
                                                Quotes Estimate Form
                                                {/* {isCopyPreview && (
                                                    <span className="badge bg-warning text-dark ms-2 small">
                                                        Copy preview — not saved yet
                                                    </span>
                                                )} */}
                                            </h4>
                                        </div>
                                        <div className="d-flex gap-3 align-items-center blueText">
                                            <i
                                                // onClick={() => downloadPDF1()}
                                                class="fa fa-download"
                                                aria-hidden="true"
                                            ></i>

                                            {/* <i class="fa fa-address-card" onClick={() => downloadPDF()}></i>  */}

                                            <button onClick={andlemodaloen} className="blueBtn">
                                                Select Freight
                                            </button>
                                            <button onClick={andndndn} className="blueBtn">
                                                Select Supplier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <section style={{ margin: 0, padding: 0 }}>
                                <div
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        outline: "auto",
                                        height: "auto",
                                    }}
                                    className="pdf-page"
                                >
                                    <p>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: "50%" }}>
                                                        <div>
                                                            <img
                                                                style={{ height: 55 }}
                                                                src={logo}
                                                                alt="hellow"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "50%",
                                                            color: "#000",
                                                            paddingBottom: "10px",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontSize: 20,
                                                                fontWeight: 600,
                                                                marginBottom: "unset",
                                                                borderBottom: "1px solid #cb191e",
                                                                display: "inline-block",
                                                            }}
                                                        >
                                                            Asia Direct - Africa
                                                        </p>
                                                        <p
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 500,
                                                                marginBottom: "unset",
                                                                lineHeight: "1.5",
                                                                marginTop: 10,
                                                            }}
                                                        >
                                                            Asia Direct, Unit 4 Villa Valencia 2 Anemoon Road
                                                            Glen Marais 1619 South Africa Web
                                                            www.asiaDirect.africa{" "}
                                                        </p>
                                                        <p>
                                                            <span>VAT Number: 4740280377</span>
                                                            <br />
                                                            TEL: +27 10 448 0733
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style={{
                                            border: "2px solid #1b2245",
                                            padding: "10px 20px",
                                            width: "100%",
                                        }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{
                                                        textAlign: "center",
                                                        fontSize: 14,
                                                        fontWeight: 600,
                                                        width: "100%",
                                                    }}>
                                                        FREIGHT ESTIMATE
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style={{
                                            border: "2px solid #1b2245",
                                            borderTop: "unset",
                                            width: "100%",
                                        }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{
                                                        width: "50%",
                                                        borderRight: "2px solid #1a2142",
                                                        height: "100%",
                                                    }}>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{
                                                                        fontSize: 14,
                                                                        padding: "5px",
                                                                    }}>
                                                                        <strong>{getdata?.client_name}
                                                                            <br />
                                                                            {getdata?.address_1}</strong>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{
                                                            background: "#1b2245",
                                                            width: "100%",
                                                            color: "white",
                                                            fontSize: 14,
                                                            textAlign: "center",

                                                            padding: 2,
                                                        }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ fontSize: 14 }}>
                                                                        Shipment Details ISO Commodity
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr>
                                                                    { }
                                                                    <td style={{ padding: "10px" }}>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",

                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",

                                                                                }}
                                                                            >
                                                                                <strong> No. of Packages</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                }}
                                                                            >
                                                                                {getdata?.no_of_packages}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Package Type</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.package_type}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Weight</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.weight}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>M3</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            ></p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Volumetric (kgs)</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.volumetric_weight}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Chargeable</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    // onKeyPress={handlepresss}
                                                                                    name="chargable_rate"
                                                                                // value={freight.chargable_rate}
                                                                                // onChange={handlechangecalc}
                                                                                ></input>
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Commodity</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.commodity}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Hazardous</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.hazardous}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Incoterm</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.incoterm}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Freight</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.freight}
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{
                                                            background: "#1b2245",
                                                            width: "100%",
                                                            color: "white",
                                                            fontSize: 14,
                                                            textAlign: "center",
                                                            margin: "0px",
                                                            padding: 2,
                                                        }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ fontSize: 14 }}>
                                                                        Rate of Exchange
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",

                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",

                                                                                }}
                                                                            >
                                                                                <strong>Final Base Currency</strong>
                                                                            </p>
                                                                            <select
                                                                                className="select_supplier border"
                                                                                style={{
                                                                                    margin: 0,
                                                                                    fontSize: 13,
                                                                                    fontWeight: 700,
                                                                                    paddingLeft: 5,
                                                                                    width: "40%",
                                                                                    border: "2px",
                                                                                }}
                                                                                // onChange={handlechangecalc}
                                                                                name="final_base_currency"
                                                                            // value={freight?.final_base_currency}
                                                                            >
                                                                                <option>Select</option>
                                                                                <option value="RAND">RAND</option>
                                                                                <option value="USD">USD</option>
                                                                                <option value="INR">INR</option>
                                                                                <option value="EURO">EURO</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{
                                                                        width: 170,
                                                                        display: "block",
                                                                        padding: "0px 10px 0px 10px",
                                                                        fontSize: 14,
                                                                    }}><strong>
                                                                            Invoice No.
                                                                        </strong></td>
                                                                    <td style={{ fontSize: 14 }}>
                                                                        <input
                                                                            type="text"
                                                                            // onKeyPress={handlepresss}
                                                                            name="supplier_invoice_no"
                                                                        // value={freight.supplier_invoice_no}
                                                                        // onChange={handlechangecalc}
                                                                        ></input>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        style={{
                                                                            width: 170,
                                                                            display: "block",
                                                                            padding: "0px 10px 0px 10px",
                                                                            fontSize: 14,
                                                                        }}
                                                                    >
                                                                        <strong>Reference</strong>
                                                                    </td>
                                                                    <td
                                                                        style={{ fontSize: 14 }}
                                                                    >
                                                                        {getdata?.client_ref_name}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        style={{
                                                                            padding: "0px 10px 0px 10px",
                                                                            width: 170,
                                                                            display: "block",
                                                                            paddingBottom: 0,
                                                                            fontSize: 14,
                                                                        }}
                                                                    >
                                                                        <strong>Quote Date</strong>
                                                                    </td>
                                                                    <td
                                                                        style={{

                                                                            fontSize: 14,
                                                                            padding: "0px 10px 0px 10px",
                                                                        }}
                                                                    >
                                                                        {new Date(getdata?.date).toLocaleDateString(
                                                                            "en-GB",
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{
                                                            background: "#1b2245",
                                                            width: "100%",
                                                            color: "white",
                                                            fontSize: 14,
                                                            textAlign: "center",
                                                            margin: "5px 0px",
                                                            padding: 2,
                                                        }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ fontSize: 14 }}>
                                                                        Shipment Details
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ padding: "0px 10px" }}>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Country of Origin</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.collection_from_name}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Place of Receipt</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.port_of_loading}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Port of Loading</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.port_of_loading}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Port of Discharge</strong>
                                                                            </p>
                                                                            <p
                                                                                className="text-dark"
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.post_of_discharge}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Place of Delivery</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.delivery_to_name}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>
                                                                                    {" "}
                                                                                    Freight Collect Accepted
                                                                                </strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {getdata?.quote_received}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Date</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                {new Date(
                                                                                    getdata?.date,
                                                                                ).toLocaleDateString("en-GB")}
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </p>
                                    <table style={{ width: "100%" }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: 0, borderRight: "1px solid black" }}>
                                                    <div
                                                        style={{
                                                            border: "1px solid black",
                                                            width: "31%",
                                                            borderBottom: "0px solid transparent",
                                                            height: 22,
                                                            borderTop: "unset",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                fontSize: 13,
                                                                fontWeight: 700,
                                                                textTransform: "uppercase",
                                                                paddingLeft: 5,
                                                            }}
                                                        >
                                                            Shipment Estimate
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="table-responsive">
                                        <table class="cost-table">
                                            <thead>
                                                <tr>
                                                    <th>Items</th>
                                                    <th>Description</th>
                                                    <th>QTY</th>
                                                    <th>
                                                        <select name="" id="">
                                                            <option value="">Currency</option>
                                                            <option value="">USD</option>
                                                            <option value="">RAND</option>
                                                            <option value="">INR</option>
                                                            <option value="">EURO</option>
                                                        </select>
                                                    </th>
                                                    <th>Cost</th>
                                                    <th>Unit type</th>
                                                    <th>Unit</th>
                                                    <th>T/ Cost</th>
                                                    <th>ROE</th>
                                                    <th>Final Amount</th>
                                                    <th>VAT Type </th>
                                                    <th>Disc % </th>
                                                    <th>Discount </th>
                                                    <th>Exclusive </th>
                                                    <th>VAT </th>
                                                    <th>VAT Incl </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {/* origin charges */}
                                                <tr>
                                                    <td>Origin Charges</td>
                                                    <td>Pick-Up Fee</td>
                                                    <td>
                                                        <input>

                                                        </input>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddQuotesInvoice;