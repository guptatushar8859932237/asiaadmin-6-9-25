import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdDownloadForOffline } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import logo from "../../Assests/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

const VAT_OPTIONS = [
  { value: "", label: "No Vat" },
  { value: "Standard Rate(15.00%)", label: "Standard Rate(15.00%)" },
  { value: "Standard Rate (Capital Goods) (15.00%)", label: "Standard Rate (Capital Goods) (15.00%)" },
  { value: "Zero Rate", label: "Zero Rate" },
  { value: "Zero Rate Exports(0.00%)", label: "Zero Rate Exports(0.00%)" },
  { value: "Exempt and Non-Suppliers(0.00%)", label: "Exempt and Non-Suppliers(0.00%)" },
  { value: "Export of Second Hands Goods(15.00%)", label: "Export of Second Hands Goods(15.00%)" },
  { value: "Change in Use(15.00%)", label: "Change in Use(15.00%)" },
  { value: "Customs VAT(100.00%)", label: "Customs VAT(100.00%)" },
  { value: "Goods and Services Imported(100.00%)", label: "Goods and Services Imported(100.00%)" },
  { value: "Capital Goods and Imported(100.00%)", label: "Capital Goods and Imported(100.00%)" },
  { value: "VAT Adjustment (100.00%)", label: "VAT Adjustment (100.00%)" },
  { value: "Domestic Reverse Charge (15.00%)", label: "Domestic Reverse Charge (15.00%)" },
  { value: "Manual VAT", label: "Manual VAT" },
  { value: "Manual VAT (Capital Goods)", label: "Manual VAT (Capital Goods)" }
];

const getVatPercent = (vatTyp) => {
  if (!vatTyp) return 0;
  if (!isNaN(vatTyp) && !isNaN(parseFloat(vatTyp))) {
    return parseFloat(vatTyp);
  }
  const match = String(vatTyp).match(/(\d+(?:\.\d+)?)\s*%/);
  if (match) {
    return parseFloat(match[1]);
  }
  return 0;
};

const getVatLabel = (val) => {
  if (!val) return "";
  if (String(val) === "15") return "Standard Rate(15.00%)";
  if (String(val) === "100") return "Customs VAT(100.00%)";
  if (String(val) === "0") return "Zero Rate";
  return val;
};

const mapEstimateComponentsToFlatFields = (freight) => {
  if (!freight || typeof freight !== "object" || Array.isArray(freight)) {
    return freight;
  }
  if (!freight.components || !Array.isArray(freight.components)) {
    return freight;
  }
  const f = { ...freight };
  f.chargable_rate = f.chargable_rate || f.chargeable || f.chargeable_rate || 0;

  const filledOriginSlots = { pickup: false, fuel: false, cfs: false, doc: false, forwarding: false, customs: false };
  const filledFreightSlots = { freight: false, insurance: false };
  const filledTransitSlots = { thc: false, unpack: false, thirdparty: false, admin: false, port: false, advise: false, doc: false, base: false };
  const filledDestinationSlots = { thc: false, unpack: false, fuelsurcharge: false, admin: false, port: false, advise: false, thirdparty: false, delivery: false, fuelcharge: false, base: false };
  const filledAdminSlots = { disbursement: false, doc: false, base: false };

  const unmappedComponents = [];

  // Pass 1: Keyword-based mapping
  f.components.forEach((c) => {
    const desc = String(c.description || c.component_description || "").toLowerCase();
    const name = String(c.name || "").toLowerCase();
    let mapped = false;

    if (name.includes("origin")) {
      if ((desc.includes("pick") || desc.includes("up") || desc.includes("fee")) && !filledOriginSlots.pickup) {
        f.freight_charge_currencyQTY = c.qty;
        f.origin_pick_up_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_cost = c.cost;
        f.pickup_freight_currency = c.currency;
        f.roe_origin_currencyorigin = c.roe;
        f.org_pickUp_vatTyp = c.vat_type;
        f["org_pickUp_disc%"] = c.disc_percent;
        f.origin_pick_up_comment = c.comment;
        filledOriginSlots.pickup = true;
        mapped = true;
      } else if (desc.includes("fuel") && !filledOriginSlots.fuel) {
        f.origin_pick_up_fuel_unitTypeQTY = c.qty;
        f.origin_pick_up_fuel_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_fuel_cost = c.cost;
        f.roe_origin_fuel_currency = c.roe;
        f.origin_pick_up_fuel_comment = c.comment;
        filledOriginSlots.fuel = true;
        mapped = true;
      } else if ((desc.includes("cfs") || desc.includes("landside")) && !filledOriginSlots.cfs) {
        f.origin_pick_up_cfs_unitTypeQTY = c.qty;
        f.origin_pick_up_cfs_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_cfs_cost = c.cost;
        f.roe_origin_cfs_currency = c.roe;
        f.origin_pick_up_cfs_comment = c.comment;
        filledOriginSlots.cfs = true;
        mapped = true;
      } else if (desc.includes("doc") && !filledOriginSlots.doc) {
        f.origin_pick_up_documantation_unitTypeQTY = c.qty;
        f.origin_pick_up_documantation_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_documantion_cost = c.cost;
        f.roe_origin_doc_currency = c.roe;
        f.origin_pick_up_documantation_comment = c.comment;
        filledOriginSlots.doc = true;
        mapped = true;
      } else if ((desc.includes("forward") || desc.includes("foreward")) && !filledOriginSlots.forwarding) {
        f.origin_pick_up_forewarding_unitTypeQTY = c.qty;
        f.origin_pick_up_forewarding_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_forewarding_cost = c.cost;
        f.roe_origin_forewarding = c.roe;
        f.origin_pick_up_forewarding_comment = c.comment;
        filledOriginSlots.forwarding = true;
        mapped = true;
      } else if (desc.includes("custom") && !filledOriginSlots.customs) {
        f.origin_pick_up_custome_unitTypeQTY = c.qty;
        f.origin_pick_up_custome_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_custome_cost = c.cost;
        f.roe_origin_customes = c.roe;
        f.origin_pick_up_custome_comment = c.comment;
        filledOriginSlots.customs = true;
        mapped = true;
      }
    } else if (name.includes("freight")) {
      if (desc.includes("insurance") && !filledFreightSlots.insurance) {
        f.freight_currency_insurance_cost = c.cost;
        f.freight_currency_insurance_unittype = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.freight_currency_insurance_unittypeQTY = c.qty;
        f.freightorigin_insurance_gp = c.gp_percent;
        f.roe_insurance_currency = c.roe;
        f.freight_currency_insurance_comment = c.comment;
        filledFreightSlots.insurance = true;
        mapped = true;
      } else if (!desc.includes("insurance") && !filledFreightSlots.freight) {
        f.freight_charge_currency_cost = c.cost;
        f.freight_charge_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.freight_charge_currency_unitTypeQTY = c.qty;
        f.freight_charge_currency_gp = c.gp_percent;
        f.roe_freight_currency = c.roe;
        f.freight_charge_currency = c.currency;
        f.ocenfreight_charge_vatTyp = c.vat_type;
        f["ocenfreight_charge_disc%"] = c.disc_percent;
        f.freight_charge_comment = c.comment;
        filledFreightSlots.freight = true;
        mapped = true;
      }
    } else if (name.includes("transit")) {
      if ((desc.includes("thc") || desc.includes("levy")) && !filledTransitSlots.thc) {
        f.transit_currency_THC_cost = c.cost;
        f.transit_currency_THC_initType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_currency_THC_initTypeQTY = c.qty;
        f.transit_currency_THC_gp = c.gp_percent;
        f.roe_Transit_Thc = c.roe;
        f.transit_currency_THC_comment = c.comment;
        filledTransitSlots.thc = true;
        mapped = true;
      } else if (desc.includes("unpack") && !filledTransitSlots.unpack) {
        f.Transit_currency_unpack_cost = c.cost;
        f.Transit_currency_unpack_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_currency_THC_initTypeeQTY = c.qty;
        f.Transit_currency_unpack_gp = c.gp_percent;
        f.Transit_unpack_roe = c.roe;
        f.Transit_currency_unpack_comment = c.comment;
        filledTransitSlots.unpack = true;
        mapped = true;
      } else if ((desc.includes("3rd") || desc.includes("party") || desc.includes("cfs")) && !filledTransitSlots.thirdparty) {
        f.transit_3rd_party_cost = c.cost;
        f.transit_3rd_party_unittype = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_3rd_party_unittypeQTY = c.qty;
        f.transit_3rd_party_gp = c.gp_percent;
        f.transit_currency_3rd = c.roe;
        f.transit_3rd_party_comment = c.comment;
        filledTransitSlots.thirdparty = true;
        mapped = true;
      } else if (desc.includes("admin") && !filledTransitSlots.admin) {
        f.transit_admin_change = c.cost;
        f.transit_admin_unittype = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_admin_unittypeQTY = c.qty;
        f.transit_admin_gp = c.gp_percent;
        f.roe_transit_admin = c.roe;
        f.transit_admin_comment = c.comment;
        filledTransitSlots.admin = true;
        mapped = true;
      } else if (desc.includes("port") && !filledTransitSlots.port) {
        f.transit_currency_port = c.cost;
        f.transit_currency_port_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_currency_port_unitTypeQTY = c.qty;
        f.transit_currency_port_gp = c.gp_percent;
        f.roe_trans_port = c.roe;
        f.transit_currency_port_comment = c.comment;
        filledTransitSlots.port = true;
        mapped = true;
      } else if ((desc.includes("advise") || desc.includes("loadhouse")) && !filledTransitSlots.advise) {
        f.Transit_advanced_load = c.cost;
        f.Transit_advanced_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Transit_advanced_unitTypeQTY = c.qty;
        f.Transit_advanced_gp = c.gp_percent;
        f.Transit_advanced_gp_roe = c.roe;
        f.Transit_advanced_comment = c.comment;
        filledTransitSlots.advise = true;
        mapped = true;
      } else if (desc.includes("doc") && !filledTransitSlots.doc) {
        f.transit_change_Documentation = c.cost;
        f.transit_change_Documentation_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_change_Documentation_unitTypeQTY = c.qty;
        f.transit_change_Documentation_gp = c.gp_percent;
        f.roe_transit_change_Documentation = c.roe;
        f.transit_change_Documentation_comment = c.comment;
        filledTransitSlots.doc = true;
        mapped = true;
      } else if (!filledTransitSlots.base) {
        f.Transit_currency_Cost = c.cost;
        f.Transit_currency_unitTpe = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Transit_currency_unitTpeQTY = c.qty;
        f.Transit_currency_gp = c.gp_percent;
        f.Transit_currency_roe = c.roe;
        f.Transit_currency = c.currency;
        f.trans_clear_fees_vatTyp = c.vat_type;
        f["trans_clear_fees_disc%"] = c.disc_percent;
        f.Transit_currency_comment = c.comment;
        filledTransitSlots.base = true;
        mapped = true;
      }
    } else if (name.includes("destination")) {
      if ((desc.includes("thc") || desc.includes("levy")) && !filledDestinationSlots.thc) {
        f.Destination_THC_currency_cost = c.cost;
        f.Destination_THC_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_THC_currency_unitTypeQTY = c.qty;
        f.Destination_THC_currency_gp = c.gp_percent;
        f.Destination_THC_currency_Roe = c.roe;
        f.Destination_THC_currency_comment = c.comment;
        filledDestinationSlots.thc = true;
        mapped = true;
      } else if (desc.includes("unpack") && !filledDestinationSlots.unpack) {
        f.Destination_Unpack_currency_cost = c.cost;
        f.Destination_Unpack_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_Unpack_currency_unitTypeQTY = c.qty;
        f.Destination_Unpack_currency_gp = c.gp_percent;
        f.Destination_Unpack_currency_roe = c.roe;
        f.Destination_Unpack_currency_comment = c.comment;
        filledDestinationSlots.unpack = true;
        mapped = true;
      } else if (desc.includes("fuel") && desc.includes("surcharge") && !filledDestinationSlots.fuelsurcharge) {
        f.Destination_fuelsurcharge_currency_cost = c.cost;
        f.Destination_fuelsurcharge_currency_typeUnit = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_fuelsurcharge_currency_typeUnitQTY = c.qty;
        f.Destination_fuelsurcharge_currency_gp = c.gp_percent;
        f.Destination_fuelsurcharge_currency_roe = c.roe;
        f.Destination_fuelsurcharge_currency_comment = c.comment;
        filledDestinationSlots.fuelsurcharge = true;
        mapped = true;
      } else if (desc.includes("admin") && !filledDestinationSlots.admin) {
        f.Destination_adminsurcharge_currency_cost = c.cost;
        f.Destination_adminsurcharge_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_adminsurcharge_currency_unitTypeQTY = c.qty;
        f.Destination_adminsurcharge_currency_gp = c.gp_percent;
        f.Destination_adminsurcharge_currency_roe = c.roe;
        f.Destination_adminsurcharge_currency_comment = c.comment;
        filledDestinationSlots.admin = true;
        mapped = true;
      } else if (desc.includes("port") && !filledDestinationSlots.port) {
        f.Destination_portcargo_currency_cost = c.cost;
        f.Destination_portcargo_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_portcargo_currency_unitTypeQTY = c.qty;
        f.Destination_portcargo_currency_gp = c.gp_percent;
        f.Destination_portcargo_currency_roe = c.roe;
        f.Destination_portcargo_currency_comment = c.comment;
        filledDestinationSlots.port = true;
        mapped = true;
      } else if ((desc.includes("advise") || desc.includes("loadhouse")) && !filledDestinationSlots.advise) {
        f.Destination_AdvancedLoad_currency_cost = c.cost;
        f.Destination_AdvancedLoad_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_AdvancedLoad_currency_unitTypeQTY = c.qty;
        f.Destination_AdvancedLoad_currency_gp = c.gp_percent;
        f.Destination_AdvancedLoad_currency_roe = c.roe;
        f.Destination_AdvancedLoad_currency_comment = c.comment;
        filledDestinationSlots.advise = true;
        mapped = true;
      } else if ((desc.includes("3rd") || desc.includes("party") || desc.includes("cfs")) && !filledDestinationSlots.thirdparty) {
        f.Destination_3rdpartyDesc_currency_cost = c.cost;
        f.Destination_3rdpartyDesc_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_3rdpartyDesc_currency_unitTypeQTY = c.qty;
        f.Destination_3rdpartyDesc_currency_gp = c.gp_percent;
        f.Destination_3rdpartyDesc_currency_roe = c.roe;
        f.Destination_3rdpartyDesc_currency_comment = c.comment;
        filledDestinationSlots.thirdparty = true;
        mapped = true;
      } else if (desc.includes("delivery") && !filledDestinationSlots.delivery) {
        f.Destination_delivery_currency_cost = c.cost;
        f.Destination_delivery_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_delivery_currency_unitTypeQTY = c.qty;
        f.Destination_delivery_currency_gp = c.gp_percent;
        f.Destination_delivery_currency_roe = c.roe;
        f.Destination_delivery_currency_comment = c.comment;
        filledDestinationSlots.delivery = true;
        mapped = true;
      } else if (desc.includes("fuel") && desc.includes("charge") && !filledDestinationSlots.fuelcharge) {
        f.Destination_fuelcharge_currency_cost = c.cost;
        f.Destination_fuelcharge_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_fuelcharge_currency_unitTypeQTY = c.qty;
        f.Destination_fuelcharge_currency_gp = c.gp_percent;
        f.Destination_fuelcharge_currency_roe = c.roe;
        f.Destination_fuelcharge_currency_comment = c.comment;
        filledDestinationSlots.fuelcharge = true;
        mapped = true;
      } else if (!filledDestinationSlots.base) {
        f.Destination_freight_currency_cost = c.cost;
        f.Destination_freight_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_freight_currency_unitTypeQTY = c.qty;
        f.Destination_freight_currency_gp = c.gp_percent;
        f.Destination_freight_currency_Roe = c.roe;
        f.Destination_freight_currency = c.currency;
        f.dest_clearing_fees_vatTyp = c.vat_type;
        f["dest_clearing_fees_disc%"] = c.disc_percent;
        f.Destination_freight_currency_comment = c.comment;
        filledDestinationSlots.base = true;
        mapped = true;
      }
    } else if (name.includes("admin")) {
      if (desc.includes("disbursement") && !filledAdminSlots.disbursement) {
        f.Destination_disbursemant_currency_cost = c.cost;
        f.Destination_disbursemant_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_disbursemant_currency_unitTypeQTY = c.qty;
        f.Destination_disbursemant_currency_gp = c.gp_percent;
        f.Destination_disbursemant_currency_roe = c.roe;
        f.Destination_disbursemant_comment = c.comment;
        filledAdminSlots.disbursement = true;
        mapped = true;
      } else if ((desc.includes("doc") || desc.includes("documentation")) && !filledAdminSlots.doc) {
        f.Destination_doc_currency_cost = c.cost;
        f.Destination_doc_currency_unittype = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_doc_currency_unittypeQTY = c.qty;
        f.Destination_doc_currency_gp = c.gp_percent;
        f.Destination_doc_currency_roe = c.roe;
        f.Destination_doc_comment = c.comment;
        filledAdminSlots.doc = true;
        mapped = true;
      } else if (!filledAdminSlots.base) {
        f.Destination_AdminAgrncy_currency_cost = c.cost;
        f.Destination_AdminAgrncy_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_AdminAgrncy_currency_unitQTY = c.qty;
        f.Destination_AdminAgrncy_currency_gp = c.gp_percent;
        f.Destination_AdminAgrncy_currency_roe = c.roe;
        f.Destination_AdminAgrncy_description = c.description;
        f.admin_currency_charge = c.currency;
        f.admin_agencyFee_vatTyp = c.vat_type;
        f["admin_agencyFee_disc%"] = c.disc_percent;
        f.Destination_AdminAgrncy_comment = c.comment;
        filledAdminSlots.base = true;
        mapped = true;
      }
    } else if (name.includes("customs")) {
      f.cust_duty_cost = c.cost;
      f.cust_duty_unitTyp = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
      f.cust_duty_qty = c.qty;
      f.cust_duty_roe = c.roe;
      f.cust_duty_curr = c.currency;
      f.cust_duty_vatTyp = c.vat_type;
      f["cust_duty_disc%"] = c.disc_percent;
      f.cust_duty_comment = c.comment;
      f.cust_duty_description = c.description;
      mapped = true;
    }

    if (!mapped) {
      unmappedComponents.push(c);
    }
  });

  // Pass 2: Sequential fallback mapping for any unmapped components
  unmappedComponents.forEach((c) => {
    const name = String(c.name || "").toLowerCase();

    if (name.includes("origin")) {
      // Find first empty slot in Origin Charges
      if (!filledOriginSlots.pickup) {
        f.freight_charge_currencyQTY = c.qty;
        f.origin_pick_up_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_cost = c.cost;
        f.pickup_freight_currency = c.currency;
        f.roe_origin_currencyorigin = c.roe;
        f.org_pickUp_vatTyp = c.vat_type;
        f["org_pickUp_disc%"] = c.disc_percent;
        f.origin_pick_up_comment = c.comment;
        filledOriginSlots.pickup = true;
      } else if (!filledOriginSlots.fuel) {
        f.origin_pick_up_fuel_unitTypeQTY = c.qty;
        f.origin_pick_up_fuel_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_fuel_cost = c.cost;
        f.roe_origin_fuel_currency = c.roe;
        f.origin_pick_up_fuel_comment = c.comment;
        filledOriginSlots.fuel = true;
      } else if (!filledOriginSlots.cfs) {
        f.origin_pick_up_cfs_unitTypeQTY = c.qty;
        f.origin_pick_up_cfs_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_cfs_cost = c.cost;
        f.roe_origin_cfs_currency = c.roe;
        f.origin_pick_up_cfs_comment = c.comment;
        filledOriginSlots.cfs = true;
      } else if (!filledOriginSlots.doc) {
        f.origin_pick_up_documantation_unitTypeQTY = c.qty;
        f.origin_pick_up_documantation_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_documantion_cost = c.cost;
        f.roe_origin_doc_currency = c.roe;
        f.origin_pick_up_documantation_comment = c.comment;
        filledOriginSlots.doc = true;
      } else if (!filledOriginSlots.forwarding) {
        f.origin_pick_up_forewarding_unitTypeQTY = c.qty;
        f.origin_pick_up_forewarding_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_forewarding_cost = c.cost;
        f.roe_origin_forewarding = c.roe;
        f.origin_pick_up_forewarding_comment = c.comment;
        filledOriginSlots.forwarding = true;
      } else if (!filledOriginSlots.customs) {
        f.origin_pick_up_custome_unitTypeQTY = c.qty;
        f.origin_pick_up_custome_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.origin_pick_up_custome_cost = c.cost;
        f.roe_origin_customes = c.roe;
        f.origin_pick_up_custome_comment = c.comment;
        filledOriginSlots.customs = true;
      }
    } else if (name.includes("freight")) {
      if (!filledFreightSlots.freight) {
        f.freight_charge_currency_cost = c.cost;
        f.freight_charge_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.freight_charge_currency_unitTypeQTY = c.qty;
        f.freight_charge_currency_gp = c.gp_percent;
        f.roe_freight_currency = c.roe;
        f.freight_charge_currency = c.currency;
        f.ocenfreight_charge_vatTyp = c.vat_type;
        f["ocenfreight_charge_disc%"] = c.disc_percent;
        f.freight_charge_comment = c.comment;
        filledFreightSlots.freight = true;
      } else if (!filledFreightSlots.insurance) {
        f.freight_currency_insurance_cost = c.cost;
        f.freight_currency_insurance_unittype = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.freight_currency_insurance_unittypeQTY = c.qty;
        f.freightorigin_insurance_gp = c.gp_percent;
        f.roe_insurance_currency = c.roe;
        f.freight_currency_insurance_comment = c.comment;
        filledFreightSlots.insurance = true;
      }
    } else if (name.includes("transit")) {
      if (!filledTransitSlots.thc) {
        f.transit_currency_THC_cost = c.cost;
        f.transit_currency_THC_initType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_currency_THC_initTypeQTY = c.qty;
        f.transit_currency_THC_gp = c.gp_percent;
        f.roe_Transit_Thc = c.roe;
        f.transit_currency_THC_comment = c.comment;
        filledTransitSlots.thc = true;
      } else if (!filledTransitSlots.unpack) {
        f.Transit_currency_unpack_cost = c.cost;
        f.Transit_currency_unpack_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_currency_THC_initTypeeQTY = c.qty;
        f.Transit_currency_unpack_gp = c.gp_percent;
        f.Transit_unpack_roe = c.roe;
        f.Transit_currency_unpack_comment = c.comment;
        filledTransitSlots.unpack = true;
      } else if (!filledTransitSlots.thirdparty) {
        f.transit_3rd_party_cost = c.cost;
        f.transit_3rd_party_unittype = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_3rd_party_unittypeQTY = c.qty;
        f.transit_3rd_party_gp = c.gp_percent;
        f.transit_currency_3rd = c.roe;
        f.transit_3rd_party_comment = c.comment;
        filledTransitSlots.thirdparty = true;
      } else if (!filledTransitSlots.admin) {
        f.transit_admin_change = c.cost;
        f.transit_admin_unittype = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_admin_unittypeQTY = c.qty;
        f.transit_admin_gp = c.gp_percent;
        f.roe_transit_admin = c.roe;
        f.transit_admin_comment = c.comment;
        filledTransitSlots.admin = true;
      } else if (!filledTransitSlots.port) {
        f.transit_currency_port = c.cost;
        f.transit_currency_port_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_currency_port_unitTypeQTY = c.qty;
        f.transit_currency_port_gp = c.gp_percent;
        f.roe_trans_port = c.roe;
        f.transit_currency_port_comment = c.comment;
        filledTransitSlots.port = true;
      } else if (!filledTransitSlots.advise) {
        f.Transit_advanced_load = c.cost;
        f.Transit_advanced_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Transit_advanced_unitTypeQTY = c.qty;
        f.Transit_advanced_gp = c.gp_percent;
        f.Transit_advanced_gp_roe = c.roe;
        f.Transit_advanced_comment = c.comment;
        filledTransitSlots.advise = true;
      } else if (!filledTransitSlots.doc) {
        f.transit_change_Documentation = c.cost;
        f.transit_change_Documentation_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.transit_change_Documentation_unitTypeQTY = c.qty;
        f.transit_change_Documentation_gp = c.gp_percent;
        f.roe_transit_change_Documentation = c.roe;
        f.transit_change_Documentation_comment = c.comment;
        filledTransitSlots.doc = true;
      } else if (!filledTransitSlots.base) {
        f.Transit_currency_Cost = c.cost;
        f.Transit_currency_unitTpe = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Transit_currency_unitTpeQTY = c.qty;
        f.Transit_currency_gp = c.gp_percent;
        f.Transit_currency_roe = c.roe;
        f.Transit_currency = c.currency;
        f.trans_clear_fees_vatTyp = c.vat_type;
        f["trans_clear_fees_disc%"] = c.disc_percent;
        f.Transit_currency_comment = c.comment;
        filledTransitSlots.base = true;
      }
    } else if (name.includes("destination")) {
      if (!filledDestinationSlots.thc) {
        f.Destination_THC_currency_cost = c.cost;
        f.Destination_THC_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_THC_currency_unitTypeQTY = c.qty;
        f.Destination_THC_currency_gp = c.gp_percent;
        f.Destination_THC_currency_Roe = c.roe;
        f.Destination_THC_currency_comment = c.comment;
        filledDestinationSlots.thc = true;
      } else if (!filledDestinationSlots.unpack) {
        f.Destination_Unpack_currency_cost = c.cost;
        f.Destination_Unpack_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_Unpack_currency_unitTypeQTY = c.qty;
        f.Destination_Unpack_currency_gp = c.gp_percent;
        f.Destination_Unpack_currency_roe = c.roe;
        f.Destination_Unpack_currency_comment = c.comment;
        filledDestinationSlots.unpack = true;
      } else if (!filledDestinationSlots.fuelsurcharge) {
        f.Destination_fuelsurcharge_currency_cost = c.cost;
        f.Destination_fuelsurcharge_currency_typeUnit = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_fuelsurcharge_currency_typeUnitQTY = c.qty;
        f.Destination_fuelsurcharge_currency_gp = c.gp_percent;
        f.Destination_fuelsurcharge_currency_roe = c.roe;
        f.Destination_fuelsurcharge_currency_comment = c.comment;
        filledDestinationSlots.fuelsurcharge = true;
      } else if (!filledDestinationSlots.admin) {
        f.Destination_adminsurcharge_currency_cost = c.cost;
        f.Destination_adminsurcharge_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_adminsurcharge_currency_unitTypeQTY = c.qty;
        f.Destination_adminsurcharge_currency_gp = c.gp_percent;
        f.Destination_adminsurcharge_currency_roe = c.roe;
        f.Destination_adminsurcharge_currency_comment = c.comment;
        filledDestinationSlots.admin = true;
      } else if (!filledDestinationSlots.port) {
        f.Destination_portcargo_currency_cost = c.cost;
        f.Destination_portcargo_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_portcargo_currency_unitTypeQTY = c.qty;
        f.Destination_portcargo_currency_gp = c.gp_percent;
        f.Destination_portcargo_currency_roe = c.roe;
        f.Destination_portcargo_currency_comment = c.comment;
        filledDestinationSlots.port = true;
      } else if (!filledDestinationSlots.advise) {
        f.Destination_AdvancedLoad_currency_cost = c.cost;
        f.Destination_AdvancedLoad_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_AdvancedLoad_currency_unitTypeQTY = c.qty;
        f.Destination_AdvancedLoad_currency_gp = c.gp_percent;
        f.Destination_AdvancedLoad_currency_roe = c.roe;
        f.Destination_AdvancedLoad_currency_comment = c.comment;
        filledDestinationSlots.advise = true;
      } else if (!filledDestinationSlots.thirdparty) {
        f.Destination_3rdpartyDesc_currency_cost = c.cost;
        f.Destination_3rdpartyDesc_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_3rdpartyDesc_currency_unitTypeQTY = c.qty;
        f.Destination_3rdpartyDesc_currency_gp = c.gp_percent;
        f.Destination_3rdpartyDesc_currency_roe = c.roe;
        f.Destination_3rdpartyDesc_currency_comment = c.comment;
        filledDestinationSlots.thirdparty = true;
      } else if (!filledDestinationSlots.delivery) {
        f.Destination_delivery_currency_cost = c.cost;
        f.Destination_delivery_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_delivery_currency_unitTypeQTY = c.qty;
        f.Destination_delivery_currency_gp = c.gp_percent;
        f.Destination_delivery_currency_roe = c.roe;
        f.Destination_delivery_currency_comment = c.comment;
        filledDestinationSlots.delivery = true;
      } else if (!filledDestinationSlots.fuelcharge) {
        f.Destination_fuelcharge_currency_cost = c.cost;
        f.Destination_fuelcharge_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_fuelcharge_currency_unitTypeQTY = c.qty;
        f.Destination_fuelcharge_currency_gp = c.gp_percent;
        f.Destination_fuelcharge_currency_roe = c.roe;
        f.Destination_fuelcharge_currency_comment = c.comment;
        filledDestinationSlots.fuelcharge = true;
      } else if (!filledDestinationSlots.base) {
        f.Destination_freight_currency_cost = c.cost;
        f.Destination_freight_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_freight_currency_unitTypeQTY = c.qty;
        f.Destination_freight_currency_gp = c.gp_percent;
        f.Destination_freight_currency_Roe = c.roe;
        f.Destination_freight_currency = c.currency;
        f.dest_clearing_fees_vatTyp = c.vat_type;
        f["dest_clearing_fees_disc%"] = c.disc_percent;
        f.Destination_freight_currency_comment = c.comment;
        filledDestinationSlots.base = true;
      }
    } else if (name.includes("admin")) {
      if (!filledAdminSlots.disbursement) {
        f.Destination_disbursemant_currency_cost = c.cost;
        f.Destination_disbursemant_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_disbursemant_currency_unitTypeQTY = c.qty;
        f.Destination_disbursemant_currency_gp = c.gp_percent;
        f.Destination_disbursemant_currency_roe = c.roe;
        f.Destination_disbursemant_comment = c.comment;
        filledAdminSlots.disbursement = true;
      } else if (!filledAdminSlots.doc) {
        f.Destination_doc_currency_cost = c.cost;
        f.Destination_doc_currency_unittype = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_doc_currency_unittypeQTY = c.qty;
        f.Destination_doc_currency_gp = c.gp_percent;
        f.Destination_doc_currency_roe = c.roe;
        f.Destination_doc_comment = c.comment;
        filledAdminSlots.doc = true;
      } else if (!filledAdminSlots.base) {
        f.Destination_AdminAgrncy_currency_cost = c.cost;
        f.Destination_AdminAgrncy_currency_unitType = c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "");
        f.Destination_AdminAgrncy_currency_unitQTY = c.qty;
        f.Destination_AdminAgrncy_currency_gp = c.gp_percent;
        f.Destination_AdminAgrncy_currency_roe = c.roe;
        f.Destination_AdminAgrncy_description = c.description;
        f.admin_currency_charge = c.currency;
        f.admin_agencyFee_vatTyp = c.vat_type;
        f["admin_agencyFee_disc%"] = c.disc_percent;
        f.Destination_AdminAgrncy_comment = c.comment;
        filledAdminSlots.base = true;
      }
    }
  });

  return f;
};

const formatValue = (val) => {
  const num = parseFloat(val);
  if (isNaN(num) || num === 0) return "-";
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function Downlaodestimate() {
  const [update, setUpdate] = useState([0]);
  const location = useLocation();
  const [freight, setFreight] = useState(
    location?.state?.freight
      ? mapEstimateComponentsToFlatFields(location?.state?.freight)
      : mapEstimateComponentsToFlatFields(location?.state?.data) || [0]
  );
  const [origin, setOrigin] = useState([0]);
  const [showData, setShowData] = useState(true);
  const pdfRef = useRef();
  const [client, setClient] = useState([]);
  const [suppluierquot, setSuppluierquot] = useState([]);
  const [supplierdata, setSupplierdata] = useState([]);
  const [getdata, setGetdata] = useState([]);
  const [dat, setDat] = useState([]);
  const [openmodal, setOpenmodal] = useState(false);
  const [selected, setSelected] = useState([]); // selected IDs
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Dynamic Rows for each section
  const [originRows, setOriginRows] = useState([]);
  const [freightRows, setFreightRows] = useState([]);
  const [transitRows, setTransitRows] = useState([]);
  const [destinationRows, setDestinationRows] = useState([]);
  const [adminRows, setAdminRows] = useState([]);
  const [customsRows, setCustomsRows] = useState([]);

  const resolveRowUnit = (unitType) => {
    if (!unitType || unitType === "Select") return 0;
    if (String(unitType) === "1") return 1;
    const rate = parseFloat(freight?.chargable_rate);
    return Number.isNaN(rate) ? 0 : rate;
  };

  const displayRowUnit = (unitType) => {
    if (!unitType || unitType === "Select") return "";
    if (String(unitType) === "1") return 1;
    return freight?.chargable_rate ?? "";
  };

  const calculateRowData = (row) => {
    const qty = parseFloat(row?.qty) || 0;
    const cost = parseFloat(row?.cost) || 0;
    const unit = resolveRowUnit(row?.unitType);
    const tCost = (row?.unitType && row?.unitType !== "Select") ? (cost * unit * qty) : 0;
    const gpPercent = parseFloat(row?.gp_percent) || 0;
    let salesPrice = tCost;
    if (gpPercent > 0 && gpPercent < 100) {
      salesPrice = tCost / (1 - gpPercent / 100);
    }
    const roe = parseFloat(row?.roe) || 0;
    const finalAmt = salesPrice * roe;

    const discPercent = parseFloat(row?.discPercent) || 0;
    const vatPercent = getVatPercent(row?.vatTyp);

    const disc = (finalAmt * discPercent) / 100;
    const exclusive = finalAmt - disc;
    let vat = (exclusive * vatPercent) / 100;
    if (row?.vatTyp === "Manual VAT" || row?.vatTyp === "Manual VAT (Capital Goods)") {
      vat = parseFloat(row?.vat) || 0;
    }
    const inclusive = exclusive + vat;

    return {
      unit,
      tCost,
      salesPrice,
      finalAmt,
      disc,
      exclusive,
      vat,
      inclusive
    };
  };

  const updateRowField = (setter, id, field, value) => {
    setter((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const loadEstimateData = (estimateData) => {
    if (!estimateData) return;

    setFreight(prev => ({
      ...prev,
      ...estimateData,
      supplier_id: estimateData.supplier_id || prev?.supplier_id || "",
      customer_invoice_no: estimateData.customer_invoice_no || prev?.customer_invoice_no || "",
      invoice_for_country: estimateData.invoice_for_country || prev?.invoice_for_country || "",
      final_base_currency: estimateData.final_base_currency || prev?.final_base_currency || "Select",
      chargable_rate: estimateData.chargeable ?? prev?.chargable_rate ?? "",
    }));

    if (estimateData.components && estimateData.components.length > 0) {
      const mappedComponents = estimateData.components.map(c => ({
        id: c.id,
        db_id: c.id,
        admin_frieght_component_id: c.admin_frieght_component_id,
        description: c.description || c.component_description || "",
        qty: c.qty !== null && c.qty !== undefined ? c.qty : "",
        currency: c.currency || "Select",
        cost: c.cost !== null && c.cost !== undefined ? c.cost : "",
        unitType: c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "Select"),
        gp_percent: c.gp_percent !== null && c.gp_percent !== undefined ? c.gp_percent : "",
        sales_price: c.sales_price !== null && c.sales_price !== undefined ? c.sales_price : "",
        roe: c.roe !== null && c.roe !== undefined ? c.roe : "",
        vatTyp: c.vat_type !== null && c.vat_type !== undefined ? getVatLabel(c.vat_type) : "",
        vat: c.vat !== null && c.vat !== undefined ? c.vat : "",
        discPercent: c.disc_percent !== null && c.disc_percent !== undefined ? c.disc_percent : "",
        comment: c.comment || ""
      }));

      const origin = mappedComponents.filter(c => {
        const orig = estimateData.components.find(x => x.id === c.db_id);
        return orig && orig.name === "Origin Charges";
      });
      const freightC = mappedComponents.filter(c => {
        const orig = estimateData.components.find(x => x.id === c.db_id);
        return orig && orig.name === "Freight Charges";
      });
      const transit = mappedComponents.filter(c => {
        const orig = estimateData.components.find(x => x.id === c.db_id);
        return orig && orig.name === "Transit Charges";
      });
      const dest = mappedComponents.filter(c => {
        const orig = estimateData.components.find(x => x.id === c.db_id);
        return orig && orig.name === "Destination Charges";
      });
      const admin = mappedComponents.filter(c => {
        const orig = estimateData.components.find(x => x.id === c.db_id);
        return orig && orig.name === "Admin Charges";
      });
      const customs = mappedComponents.filter(c => {
        const orig = estimateData.components.find(x => x.id === c.db_id);
        return orig && orig.name === "Customs Charges";
      });

      setOriginRows(origin);
      setFreightRows(freightC);
      setTransitRows(transit);
      setDestinationRows(dest);
      setAdminRows(admin);
      setCustomsRows(customs);
    } else {
      const f = mapEstimateComponentsToFlatFields(estimateData);
      setOriginRows([
        {
          id: 1,
          description: f.origin_pick_up_description || "Origin Pick Up",
          qty: f.freight_charge_currencyQTY || "",
          currency: f.pickup_freight_currency || "Select",
          cost: f.origin_pick_up_cost || "",
          unitType: f.origin_pick_up_unitType || "Select",
          gp_percent: "",
          sales_price: "",
          roe: f.roe_origin_currencyorigin || "",
          vatTyp: getVatLabel(f.org_pickUp_vatTyp || ""),
          discPercent: f["org_pickUp_disc%"] || "",
          comment: f.origin_pick_up_comment || "",
        }
      ]);
      setFreightRows([
        {
          id: 2,
          description: f.freight_charge_description || "Freight Charges",
          qty: f.freight_charge_currency_unitTypeQTY || "",
          currency: f.freight_charge_currency || "Select",
          cost: f.freight_charge_currency_cost || "",
          unitType: f.freight_charge_currency_unitType || "Select",
          gp_percent: "",
          sales_price: "",
          roe: f.roe_freight_currency || "",
          vatTyp: getVatLabel(f.ocenfreight_charge_vatTyp || ""),
          discPercent: f["ocenfreight_charge_disc%"] || "",
          comment: f.freight_charge_comment || "",
        }
      ]);
      setTransitRows([
        {
          id: 3,
          description: f.Transit_currency_description || "Transit Charges",
          qty: f.Transit_currency_unitTpeQTY || "",
          currency: f.Transit_currency || "Select",
          cost: f.Transit_currency_Cost || "",
          unitType: f.Transit_currency_unitTpe || "Select",
          gp_percent: "",
          sales_price: "",
          roe: f.Transit_currency_roe || "",
          vatTyp: getVatLabel(f.trans_clear_fees_vatTyp || ""),
          discPercent: f["trans_clear_fees_disc%"] || "",
          comment: f.Transit_currency_comment || "",
        }
      ]);
      setDestinationRows([
        {
          id: 4,
          description: f.Destination_freight_currency_description || "Destination Charges",
          qty: f.Destination_freight_currency_unitTypeQTY || "",
          currency: f.Destination_freight_currency || "Select",
          cost: f.Destination_freight_currency_cost || "",
          unitType: f.Destination_freight_currency_unitType || "Select",
          gp_percent: "",
          sales_price: "",
          roe: f.Destination_freight_currency_Roe || "",
          vatTyp: getVatLabel(f.dest_clearing_fees_vatTyp || ""),
          discPercent: f["dest_clearing_fees_disc%"] || "",
          comment: f.Destination_freight_currency_comment || "",
        }
      ]);
      setAdminRows([
        {
          id: 5,
          description: f.Destination_AdminAgrncy_description || "Admin Charges",
          qty: f.Destination_AdminAgrncy_currency_unitQTY || "",
          currency: f.admin_currency_charge || "Select",
          cost: f.Destination_AdminAgrncy_currency_cost || "",
          unitType: f.Destination_AdminAgrncy_currency_unitType || "Select",
          gp_percent: "",
          sales_price: "",
          roe: f.Destination_AdminAgrncy_currency_roe || "",
          vatTyp: getVatLabel(f.admin_agencyFee_vatTyp || ""),
          discPercent: f["admin_agencyFee_disc%"] || "",
          comment: f.Destination_AdminAgrncy_comment || "",
        }
      ]);
      setCustomsRows([
        {
          id: 6,
          description: f.cust_duty_description || "Customs Charges",
          qty: f.cust_duty_qty || "",
          currency: f.cust_duty_curr || "Select",
          cost: f.cust_duty_cost || "",
          unitType: f.cust_duty_unitTyp || "Select",
          gp_percent: "",
          sales_price: "",
          roe: f.cust_duty_roe || "",
          vatTyp: getVatLabel(f.cust_duty_vatTyp || ""),
          discPercent: f["cust_duty_disc%"] || "",
          comment: f.cust_duty_comment || "",
        }
      ]);
    }
  };

  const renderRow = (row, calc, setter) => {
    return (
      <tr key={row.id}>
        <td>{row.description || ""}</td>
        <td>
          <input
            style={{ marginBottom: 0, fontSize: 13, color: "black", fontWeight: 400, border: "0px", verticalAlign: "middle" }}
            type="text"
            className="supplier_form"
            onChange={(e) => updateRowField(setter, row.id, "qty", e.target.value)}
            value={row.qty || ""}
            placeholder="0.00"
          />
        </td>
        <td>
          <select
            className="select_supplier"
            style={{ margin: 0, fontSize: 13, fontWeight: 700, paddingLeft: 5, border: 0 }}
            onChange={(e) => updateRowField(setter, row.id, "unitType", e.target.value)}
            value={row.unitType || "Select"}
          >
            <option value="Select">Select</option>
            <option value="1">L/S</option>
            <option value="2">W/M</option>
          </select>
        </td>
        <td>
          <input
            style={{ marginBottom: 0, fontSize: 13, color: "black", fontWeight: 400, border: "0px", verticalAlign: "middle" }}
            type="text"
            className="supplier_form"
            disabled
            value={displayRowUnit(row.unitType)}
            placeholder="0.00"
          />
        </td>
        <td>
          <input
            style={{ marginBottom: 0, fontSize: 13, color: "black", fontWeight: 400, border: "0px", verticalAlign: "middle" }}
            type="text"
            className="supplier_form"
            onKeyPress={handlepresss}
            onChange={(e) => updateRowField(setter, row.id, "cost", e.target.value)}
            value={row.cost || ""}
            placeholder="0.00"
          />
        </td>
        <td>
          <select
            className="select_supplier"
            style={{ margin: 0, fontSize: 13, fontWeight: 700, paddingLeft: 5, border: 0 }}
            onChange={(e) => updateRowField(setter, row.id, "currency", e.target.value)}
            value={row.currency || "Select"}
          >
            <option value="Select">Select</option>
            <option value="RAND">RAND</option>
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EURO">EURO</option>
          </select>
        </td>
        <td>
          <input
            style={{ marginBottom: 0, fontSize: 13, color: "black", border: "0px", verticalAlign: "middle" }}
            name="roe"
            onChange={(e) => updateRowField(setter, row.id, "roe", e.target.value)}
            value={row.roe || ""}
            className="supplier_form"
          />
        </td>
        <td>
          <input
            style={{ marginBottom: 0, fontSize: 13, color: "black", border: "0px", verticalAlign: "middle" }}
            disabled
            value={isNaN(calc.finalAmt) ? "0.00" : calc.finalAmt.toFixed(2)}
            className="supplier_form"
          />
        </td>
        <td>
          <select
            className="select_supplier"
            style={{ margin: 0, fontSize: 13, fontWeight: 700, paddingLeft: 5, border: 0 }}
            onChange={(e) => updateRowField(setter, row.id, "vatTyp", e.target.value)}
            value={row.vatTyp || ""}
          >
            {VAT_OPTIONS.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            style={{ marginBottom: 0, fontSize: 13, color: "black", width: "50px", border: "0px", verticalAlign: "middle" }}
            type="text"
            onChange={(e) => updateRowField(setter, row.id, "discPercent", e.target.value)}
            value={row.discPercent || ""}
            placeholder="0.00%"
          />
        </td>
        <td>
          <input
            style={{ marginBottom: 0, fontSize: 13, color: "black", border: "0px", verticalAlign: "middle" }}
            disabled
            value={formatValue(calc.disc)}
            className="supplier_form"
          />
        </td>
        <td>
          <input
            style={{ marginBottom: 0, fontSize: 13, color: "black", border: "0px", verticalAlign: "middle" }}
            disabled
            value={formatValue(calc.exclusive)}
            className="supplier_form"
          />
        </td>
        <td>
          <input
            style={{ marginBottom: 0, fontSize: 13, color: "black", border: "0px", verticalAlign: "middle" }}
            disabled
            value={formatValue(calc.vat)}
            className="supplier_form"
          />
        </td>
      </tr>
    );
  };

  const getdata122 = location?.state?.data || {};
  console.log(getdata122?.data);
  console.log(getdata122);

  // Save key IDs to localStorage if present in state to persist through page refresh
  if (getdata122?.freight_id) {
    localStorage.setItem("freightid", getdata122.freight_id);
  } else if (getdata122?.id) {
    localStorage.setItem("freightid", getdata122.id);
  }
  const initialQuoteEstimateId = getdata122?.freight_quote_estimate_id || getdata122?.quote_estimate_id;
  // if (initialQuoteEstimateId) {
  //   localStorage.setItem("freight_quote_estimate_id", initialQuoteEstimateId);
  // }
  if (getdata122?.supplier_id) {
    localStorage.setItem("supplierid", getdata122.supplier_id);
  }

  const getFreightId = () => getdata122?.freight_id || getdata122?.id ;
  const getQuoteEstimateId = () => getdata122?.freight_quote_estimate_id ;
  const getQouteEstimateId2 = () => getdata122?.quote_estimate_id
  const getSupplierId = () => getdata122?.supplier_id || freight?.supplier_id || localStorage.getItem("supplierid");

  useEffect(() => {
    getFreightDataById();
  }, []);

  const getFreightDataById = async () => {
    const fId = getFreightId();
    if (!fId) {
      console.log("No freight ID found in state or localStorage");
      return;
    }
    const payload = {
      freight_id: fId,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}freight-list-byId`,
        payload
      );
      if (response?.data?.data?.length > 0) {
        setGetdata(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching freight data by id:", error);
    }
  };

  const getFreightQuoteEstimate = async () => {
    const payload = {};
    const quoteEstimateId = getQuoteEstimateId();
    if (quoteEstimateId) {
      payload.freight_quote_estimate_id = parseInt(quoteEstimateId);
    }
    const fId = getFreightId();
    if (fId) {
      payload.freight_id = parseInt(fId);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}GetFreightQuoteEstimateById`,
        payload
      );
      if (response.data && response.data.success && response.data.data) {
        const rawData = response.data.data;
        const estimateData = Array.isArray(rawData) ? rawData[0] : rawData;
        if (estimateData) {
          loadEstimateData(estimateData);
        }
      }
    } catch (error) {
      console.error("Error fetching freight quote estimate by id:", error);
    }
  };
  //   const andlemodaloen = () => {
  //     setOpenmodal(true);
  //   };
  const handlechangecalc = (e) => {
    const { name, value } = e.target;
    setFreight((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };
    const originRowsData = originRows.map(row => ({
    row,
    calc: calculateRowData(row)
  }));
  const totalChangeRoeOrigin = originRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);
  const totalOriginDiscount = originRowsData.reduce((sum, item) => sum + item.calc.disc, 0);
  const totalOriginExclusive = originRowsData.reduce((sum, item) => sum + item.calc.exclusive, 0);
  const totalOriginVat = originRowsData.reduce((sum, item) => sum + item.calc.vat, 0);

  const freightRowsData = freightRows.map(row => ({
    row,
    calc: calculateRowData(row)
  }));
  const totalChangeRoeFreight = freightRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);
  const totalFreightDiscount = freightRowsData.reduce((sum, item) => sum + item.calc.disc, 0);
  const totalFreightExclusive = freightRowsData.reduce((sum, item) => sum + item.calc.exclusive, 0);
  const totalFreightVat = freightRowsData.reduce((sum, item) => sum + item.calc.vat, 0);

  const transitRowsData = transitRows.map(row => ({
    row,
    calc: calculateRowData(row)
  }));
  const totalChangeRoeTransit = transitRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);
  const totalTransitDiscount = transitRowsData.reduce((sum, item) => sum + item.calc.disc, 0);
  const totalTransitExclusive = transitRowsData.reduce((sum, item) => sum + item.calc.exclusive, 0);
  const totalTransitVat = transitRowsData.reduce((sum, item) => sum + item.calc.vat, 0);

  const destinationRowsData = destinationRows.map(row => ({
    row,
    calc: calculateRowData(row)
  }));
  const totalChangeRoeDestination = destinationRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);
  const totalDestinationDiscount = destinationRowsData.reduce((sum, item) => sum + item.calc.disc, 0);
  const totalDestinationExclusive = destinationRowsData.reduce((sum, item) => sum + item.calc.exclusive, 0);
  const totalDestinationVat = destinationRowsData.reduce((sum, item) => sum + item.calc.vat, 0);

  const adminRowsData = adminRows.map(row => ({
    row,
    calc: calculateRowData(row)
  }));
  const totalChangeRoeAdmin = adminRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);
  const totalAdminDiscount = adminRowsData.reduce((sum, item) => sum + item.calc.disc, 0);
  const totalAdminExclusive = adminRowsData.reduce((sum, item) => sum + item.calc.exclusive, 0);
  const totalAdminVat = adminRowsData.reduce((sum, item) => sum + item.calc.vat, 0);

  const customsRowsData = customsRows.map(row => ({
    row,
    calc: calculateRowData(row)
  }));
  const totalChangeRoeCustoms = customsRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);
  const totalCustomsDiscount = customsRowsData.reduce((sum, item) => sum + item.calc.disc, 0);
  const totalCustomsExclusive = customsRowsData.reduce((sum, item) => sum + item.calc.exclusive, 0);
  const totalCustomsVat = customsRowsData.reduce((sum, item) => sum + item.calc.vat, 0);

  // Grand totals
  const grandTotalFinalAmt = totalChangeRoeOrigin + totalChangeRoeFreight + totalChangeRoeTransit + totalChangeRoeDestination + totalChangeRoeAdmin + totalChangeRoeCustoms;
  const grandTotalDiscount = totalOriginDiscount + totalFreightDiscount + totalTransitDiscount + totalDestinationDiscount + totalAdminDiscount + totalCustomsDiscount;
  const grandTotalExclusive = totalOriginExclusive + totalFreightExclusive + totalTransitExclusive + totalDestinationExclusive + totalAdminExclusive + totalCustomsExclusive;
  const grandTotalVat = totalOriginVat + totalFreightVat + totalTransitVat + totalDestinationVat + totalAdminVat + totalCustomsVat;

  const sumofall = 
    originRowsData.reduce((sum, item) => sum + item.calc.tCost, 0) +
    freightRowsData.reduce((sum, item) => sum + item.calc.tCost, 0) +
    transitRowsData.reduce((sum, item) => sum + item.calc.tCost, 0) +
    destinationRowsData.reduce((sum, item) => sum + item.calc.tCost, 0) +
    adminRowsData.reduce((sum, item) => sum + item.calc.tCost, 0) +
    customsRowsData.reduce((sum, item) => sum + item.calc.tCost, 0);

  const sumofRoe = grandTotalFinalAmt;
  const totalVatInclusive = grandTotalExclusive + grandTotalVat;

  const estimateCalculate = async () => {
    try {
      const allComponents = [];

      const mapRowToComponent = (row, calc, sectionName) => ({
        ...(row.db_id && { id: row.db_id }),
        admin_frieght_component_id: row.admin_frieght_component_id || null,
        description: row.description || "",
        qty: parseFloat(row.qty) || 0,
        currency: row.currency || "",
        cost: parseFloat(row.cost) || 0,
        unit_type: row.unitType === "1" ? "L/S" : (row.unitType === "2" ? "W/M" : ""),
        unit: parseFloat(calc.unit) || 0,
        total_cost: parseFloat(calc.tCost) || 0,
        gp_percent: parseFloat(row.gp_percent) || 0,
        sales_price: parseFloat(calc.salesPrice) || 0,
        roe: parseFloat(row.roe) || 0,
        final_amount: parseFloat(calc.finalAmt) || 0,
        vat_type: row.vatTyp || "",
        disc_percent: parseFloat(row.discPercent) || 0,
        discount: parseFloat(calc.disc) || 0,
        exclusive: parseFloat(calc.exclusive) || 0,
        vat: parseFloat(calc.vat) || 0,
        vat_incl: parseFloat(calc.inclusive) || 0,
        comment: row.comment || "",
        name: sectionName
      });

      originRowsData.forEach(({ row, calc }) => {
        if (row.description) {
          allComponents.push(mapRowToComponent(row, calc, "Origin Charges"));
        }
      });
      freightRowsData.forEach(({ row, calc }) => {
        if (row.description) {
          allComponents.push(mapRowToComponent(row, calc, "Freight Charges"));
        }
      });
      transitRowsData.forEach(({ row, calc }) => {
        if (row.description) {
          allComponents.push(mapRowToComponent(row, calc, "Transit Charges"));
        }
      });
      destinationRowsData.forEach(({ row, calc }) => {
        if (row.description) {
          allComponents.push(mapRowToComponent(row, calc, "Destination Charges"));
        }
      });
      adminRowsData.forEach(({ row, calc }) => {
        if (row.description) {
          allComponents.push(mapRowToComponent(row, calc, "Admin Charges"));
        }
      });
      customsRowsData.forEach(({ row, calc }) => {
        if (row.description) {
          allComponents.push(mapRowToComponent(row, calc, "Customs Charges"));
        }
      });

      const payload = {
        freight_id: parseInt(getFreightId()),
        client_id: parseInt(getdata.client_id || getdata.id || getdata.client_ref ),
        client_name: getdata.client_name,
        supplier_id: parseInt(getSupplierId()) || null,
        customer_invoice_no: freight.customer_invoice_no || "",
        invoice_for_country: freight.invoice_for_country || "",
        quote_type: "ADMIN",
        date: getdata.date ? new Date(getdata.date).toISOString().split('T')[0] : getTodayDate(),
        final_base_currency: freight.final_base_currency || "Select",
        sumof_totalcost: parseFloat(sumofall) || 0,
        sumof_finalamount: parseFloat(sumofRoe) || 0,
        sumof_vatincl: parseFloat(totalVatInclusive) || 0,
        chargeable: parseFloat(freight.chargable_rate) || 0,
        components: allComponents,
      };

      console.log("[Add Invoice] add-freight-quotes-estimate payload:", payload);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}add-freight-quotes-estimate`,
        payload
      );
      if (response.data.success === true) {
        toast.success(response.data.message);
      } else {
        console.log("some thing went wrong");
      }
    } catch (error) {
      console.log("Full Error =>", error);
    }
  };

const supplier = () => {
    const fId = getFreightId();
    if (!fId) {
      console.log("No freight ID found, skipping supplier fetch");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}get-suppler-selected`, {
        freight_id: fId,
      })
      .then((response) => {
        // console.log(response);
        setClient(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response?.data || error.message);
      });
  };
  useEffect(() => {
    supplier();
    supplierSelected();
  }, []);
  const handlepresss = (e) => {
    if (e.charCode < 42 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  // ////////////////////////////////////////////////////supplier selected
  const supplierSelected = async () => {
    const fId = getFreightId();
    if (!fId) {
      console.log("No freight ID found, skipping supplierSelected fetch");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}get-suppler-selected`,
        { freight_id: fId }
      );
      // console.log(response);
      if (response?.data?.data) {
        setSelected(response.data.data.map((item) => item.id));
        // setClient(response.data.data);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };
  const dateformate = new Date(getdata?.date).toLocaleDateString("en-GB");
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    getsupplier();
  }, []);
  useEffect(() => {
    getdataapi();
    getNewDataapi();
    getFreightQuoteEstimate();
  }, []);

  const getsupplier = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
      .then((response) => {
        setSupplierdata(response.data.data);
        setSuppluierquot(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getdataapi = async () => {
    const quoteEstimateId = getQuoteEstimateId();
    const freightId = getFreightId();
    if (!quoteEstimateId && !freightId) {
      console.log("No quote_estimate_id or freight_id found to fetch estimate in getdataapi");
      return;
    }
    const data123456 = {
      quote_estimate_id: quoteEstimateId,
      estimate_id: quoteEstimateId,
      freight_id: freightId,
      freight,
    };
    const suppId = getSupplierId();
    if (suppId) {
      data123456.supplier_id = parseInt(suppId);
    }
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}get-shipestimate`, data123456)
      .then((response) => {
        console.log(response.data.data);
        const rawData = response.data.data;
        const estimateData = Array.isArray(rawData) ? rawData[0] : rawData;
        if (estimateData) {
          setFreight(mapEstimateComponentsToFlatFields(estimateData) || [0]);
        }
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
      });
  };

  const getNewDataapi = async () => {
    const quoteEstimateId = getQouteEstimateId2();
    if (!quoteEstimateId) {
      console.log("No quote_estimate_id or freight_quote_estimate_id found to fetch estimate in getNewDataapi");
      return;
    }
    const data123456 = {
      quote_estimate_id: quoteEstimateId,
      freight_id: getFreightId(),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}GetQuoteShipEstimateById`,
        data123456
      )
      .then((response) => {
        console.log(response.data.data);
        const rawData = response.data.data;
        const estimateData = Array.isArray(rawData) ? rawData[0] : rawData;
        if (estimateData) {
          setFreight(mapEstimateComponentsToFlatFields(estimateData) || [0]);
        }
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
      });
  };
  const handleclicknav = () => {
    window.history.back();
  };
  const getdata1 = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
      .then((response) => {
        setDat(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getdata1();
  }, []);
  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  const handleAddSupplier = async () => {
    if (selected.length === 0) {
      toast.error("Please select at least one supplier.");
      return;
    }
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/freight/assign-Suppliers`,
      { freight_id: getFreightId(), supplier_ids: selected }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      setOpenmodal(false);
    }
    // console.log("something went wrong")
  };
  const downloadPDF = () => {
    downloadPDF1();
  };
  const downloadPDF1 = async () => {
    const element = pdfRef.current;
    if (!element) return;

    // Clone the element to adjust its styling for PDF generation without affecting screen display
    const clone = element.cloneNode(true);

    // Sync input and select values from original element to the clone
    const originalInputs = element.querySelectorAll("input, select, textarea");
    const cloneInputs = clone.querySelectorAll("input, select, textarea");
    originalInputs.forEach((input, index) => {
      if (cloneInputs[index]) {
        if (input.tagName === "SELECT") {
          cloneInputs[index].value = input.value;
        } else if (input.type === "checkbox" || input.type === "radio") {
          cloneInputs[index].checked = input.checked;
        } else {
          cloneInputs[index].value = input.value;
        }
      }
    });

    // Replace inputs and selects with plain text in the clone for a clean PDF look
    clone.querySelectorAll("input, select, textarea").forEach((el) => {
      let displayValue = "";
      if (el.tagName === "SELECT") {
        const selectedOption = el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null;
        displayValue = (selectedOption?.textContent ?? "").trim();
        if (displayValue === "Select") displayValue = "";
      } else {
        displayValue = (el.value ?? "").trim();
      }

      const span = document.createElement("span");
      span.textContent = displayValue;
      span.style.fontSize = "13px";
      span.style.fontWeight = "bold";
      span.style.color = "#000";

      el.style.display = "none";
      if (el.parentNode) {
        el.parentNode.insertBefore(span, el.nextSibling);
      }
    });

    // Create temporary container offscreen
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "1600px";
    container.style.height = "auto";
    container.style.overflow = "visible";
    container.style.background = "#ffffff";
    container.appendChild(clone);
    document.body.appendChild(container);

    // Override styling on the clone to guarantee it is displayed wide
    clone.style.width = "1600px";
    clone.style.minWidth = "1600px";
    clone.style.maxWidth = "1600px";

    const pdfPage = clone.querySelector(".pdf-page") || clone;
    pdfPage.style.width = "1600px";
    pdfPage.style.minWidth = "1600px";
    pdfPage.style.maxWidth = "1600px";
    pdfPage.style.padding = "20px";
    pdfPage.style.boxSizing = "border-box";
    pdfPage.style.outline = "none";

    const tableResponsive = clone.querySelector(".table-responsive");
    if (tableResponsive) {
      tableResponsive.style.overflow = "visible";
      tableResponsive.style.width = "100%";
      tableResponsive.style.maxWidth = "100%";
    }

    const contentHeight = container.scrollHeight || clone.offsetHeight || 1200;

    const options = {
      margin: 0,
      filename: "client-estimate.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { 
        scale: 1.5, 
        useCORS: true, 
        windowWidth: 1600,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        width: 1600,
        height: contentHeight
      },
      jsPDF: {
        unit: "px",
        format: [1600, contentHeight],
        orientation: "portrait",
      },
      pagebreak: { mode: ["css", "legacy"] },
    };

    try {
      await html2pdf().from(clone).set(options).save();
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <>
      <div className="wpWrapper ">
        <div className="container-fluid">
          <div className=" ">
            <div className=" ">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <div>
                        <ArrowBackIcon
                          onClick={handleclicknav}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <div>
                        <h4 className="freight_hd mt-0 ms-3">Supplier Form</h4>
                      </div>
                    </div>
                    {/* <button onClick={andlemodaloen} className="btn btn-success">
                      Assign Supplier
                    </button> */}
                    <MdDownloadForOffline
                      onClick={() => downloadPDF()}
                      className="fs-2"
                      style={{ color: "#1b2245", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>

              <section ref={pdfRef} style={{ margin: 0, padding: 0 }}>
                <div
                  style={{
                    width: "100%",
                    padding: "20px",
                    outline: "auto",
                    height: "auto",
                  }}
                  className="pdf-page"
                >
                  <p>
                    <table style={{ margin: "20px" }}>
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
                          <td style={{ width: "50%", color: "#000" }}>
                            <p
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                marginBottom: "unset",
                                borderBottom: "1px solid #cb191e",
                                display: "inline-block",
                                paddingBottom: 5,
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
                                marginTop: 5,
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
                            <p> </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table style={{ paddingTop: "20px", marginTop: "20px" }}>
                      <tbody>
                        <tr>
                          <td
                            style={{ fontSize: 14, textTransform: "lowercase" }}
                          ></td>
                          <td
                            style={{
                              fontSize: 14,
                              padding: "0px 20px",
                              textTransform: "lowercase",
                            }}
                          ></td>
                          <td
                            style={{ fontSize: 14, textTransform: "lowercase" }}
                          ></td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style={{
                        border: "2px solid #1b2245",
                        padding: "10px 20px",
                        width: "100%",
                        marginTop: 20,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: 14,
                              fontWeight: 600,
                              width: "100%",
                            }}
                          >
                            FREIGHT ESTIMATE
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style={{
                        border: "2px solid #1b2245",
                        borderTop: "unset",
                        width: "100%",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "50%",
                              borderRight: "2px solid #1a2142",
                              height: "100%",
                            }}
                          >
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      fontSize: 14,
                                      padding: "0px 10px",
                                    }}
                                  >
                                    <strong>
                                      {getdata?.client_name}
                                      <br />
                                      {getdata?.address_1}
                                    </strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 14,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
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
                                        <strong>No. of Packages</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 5,
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
                                          onKeyPress={handlepresss}
                                          name="chargable_rate"
                                          value={freight.chargable_rate}
                                          onChange={handlechangecalc}
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
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 14,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
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
                                  <td>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: 10,
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
                                        onChange={handlechangecalc}
                                        name="final_base_currency"
                                        value={freight?.final_base_currency}
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
                          <td style={{ width: "50%", paddingTop: 10 }}>
                            <table>
                              <tbody>
                                <tr>
                                  <td style={{
                                    width: 170,
                                    display: "block",
                                    padding: "0px 10px",
                                    fontSize: 13,

                                  }}><strong>
                                      Invoice For
                                    </strong></td>
                                    <td
                                    style={{ paddingBottom: 10, fontSize: 14 }}
                                  >
                                    {freight?.invoice_for_country || ""}
                                  </td>
                                  {/* <td style={{ fontSize: 13, marginBottom: 4, }}>
                                    <select
                                      name="invoice_for_country"
                                      value={freight.invoice_for_country || ""}
                                      onChange={handlechangecalc}
                                      style={{ width: "100%", padding: "2px" }}
                                    >
                                      <option value="">Select Country</option>
                                      <option value="South Africa">South Africa</option>
                                      <option value="Zambia">Zambia</option>
                                      <option value="Zimbabwe">Zimbabwe</option>
                                    </select>
                                  </td> */}
                                </tr>
                                <tr>
                                  <td style={{
                                    width: 170,
                                    display: "block",
                                    padding: "0px 10px",
                                    fontSize: 13,
                                  }}><strong>
                                      Invoice No.
                                    </strong></td>
                                    <td
                                    style={{ fontSize: 14 }}
                                  >
                                    {freight?.customer_invoice_no || ""}
                                  </td>
                                  {/* <td style={{ fontSize: 13, paddingTop: "5px" }}>
                                    <input
                                      type="text"
                                      name="customer_invoice_no"
                                      value={freight.customer_invoice_no || ""}
                                      onChange={handlechangecalc}
                                    ></input>
                                  </td> */}
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      width: 170,
                                      display: "block",
                                      padding: "0px 10px",
                                      fontSize: 14,
                                    }}
                                  >
                                    <strong>Reference</strong>
                                  </td>
                                  <td
                                    style={{  fontSize: 14 }}
                                  >
                                    {freight?.reference_no}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "0px 10px 10px 10px",
                                      width: 170,
                                      display: "block",
                                      fontSize: 14,
                                    }}
                                  >
                                    <strong>Quote Date</strong>
                                  </td>
                                  <td
                                    style={{
                                      fontSize: 14,
                                    }}
                                  >
                                    {new Date(getdata?.date).toLocaleDateString(
                                      "en-GB"
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 14,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
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
                                          getdata?.date
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
                        <td
                          style={{ padding: 0, borderRight: "1px solid black" }}
                        >
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
                              QUOTE INFORMATION
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="table-responsive">
                    <table className="cost-table">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>QTY</th>
                          <th>UOM</th>
                          <th>Unit</th>
                          <th>Price</th>
                          <th>Curr</th>
                          <th>Exch rate</th>
                          <th>Total</th>
                          <th>VAT Type</th>
                          <th>Disc %</th>
                          <th>Discount</th>
                          <th>Exclusive</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* 1. Origin Charges */}
                        {originRows.length > 0 && (
                          <>
                            <tr className="estimate-section-row" style={{ backgroundColor: "#f0f2f5" }}>
                              <td colSpan={13}>
                                <strong>Origin Charges</strong>
                              </td>
                            </tr>
                            {originRowsData.map(({ row, calc }) => renderRow(row, calc, setOriginRows))}
                            <tr style={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
                              <td colSpan={7}>Total - Origin Charges</td>
                              <td>{formatValue(totalChangeRoeOrigin)}</td>
                              <td></td>
                              <td></td>
                              <td>{formatValue(totalOriginDiscount)}</td>
                              <td>{formatValue(totalOriginExclusive)}</td>
                              <td>{formatValue(totalOriginVat)}</td>
                            </tr>
                          </>
                        )}

                        {/* 2. Freight Charges */}
                        {freightRows.length > 0 && (
                          <>
                            <tr className="estimate-section-row" style={{ backgroundColor: "#f0f2f5" }}>
                              <td colSpan={13}>
                                <strong>Freight Charges</strong>
                              </td>
                            </tr>
                            {freightRowsData.map(({ row, calc }) => renderRow(row, calc, setFreightRows))}
                            <tr style={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
                              <td colSpan={7}>Total - Freight Charges</td>
                              <td>{formatValue(totalChangeRoeFreight)}</td>
                              <td></td>
                              <td></td>
                              <td>{formatValue(totalFreightDiscount)}</td>
                              <td>{formatValue(totalFreightExclusive)}</td>
                              <td>{formatValue(totalFreightVat)}</td>
                            </tr>
                          </>
                        )}

                        {/* 3. Transit Charges */}
                        {transitRows.length > 0 && (
                          <>
                            <tr className="estimate-section-row" style={{ backgroundColor: "#f0f2f5" }}>
                              <td colSpan={13}>
                                <strong>Transit Charges</strong>
                              </td>
                            </tr>
                            {transitRowsData.map(({ row, calc }) => renderRow(row, calc, setTransitRows))}
                            <tr style={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
                              <td colSpan={7}>Total - Transit Charges</td>
                              <td>{formatValue(totalChangeRoeTransit)}</td>
                              <td></td>
                              <td></td>
                              <td>{formatValue(totalTransitDiscount)}</td>
                              <td>{formatValue(totalTransitExclusive)}</td>
                              <td>{formatValue(totalTransitVat)}</td>
                            </tr>
                          </>
                        )}

                        {/* 4. Destination Charges */}
                        {destinationRows.length > 0 && (
                          <>
                            <tr className="estimate-section-row" style={{ backgroundColor: "#f0f2f5" }}>
                              <td colSpan={13}>
                                <strong>Destination Charges</strong>
                              </td>
                            </tr>
                            {destinationRowsData.map(({ row, calc }) => renderRow(row, calc, setDestinationRows))}
                            <tr style={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
                              <td colSpan={7}>Total - Destination Charges</td>
                              <td>{formatValue(totalChangeRoeDestination)}</td>
                              <td></td>
                              <td></td>
                              <td>{formatValue(totalDestinationDiscount)}</td>
                              <td>{formatValue(totalDestinationExclusive)}</td>
                              <td>{formatValue(totalDestinationVat)}</td>
                            </tr>
                          </>
                        )}

                        {/* 5. Admin Charges */}
                        {adminRows.length > 0 && (
                          <>
                            <tr className="estimate-section-row" style={{ backgroundColor: "#f0f2f5" }}>
                              <td colSpan={13}>
                                <strong>Admin Charges</strong>
                              </td>
                            </tr>
                            {adminRowsData.map(({ row, calc }) => renderRow(row, calc, setAdminRows))}
                            <tr style={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
                              <td colSpan={7}>Total - Admin Charges</td>
                              <td>{formatValue(totalChangeRoeAdmin)}</td>
                              <td></td>
                              <td></td>
                              <td>{formatValue(totalAdminDiscount)}</td>
                              <td>{formatValue(totalAdminExclusive)}</td>
                              <td>{formatValue(totalAdminVat)}</td>
                            </tr>
                          </>
                        )}

                        {/* 6. Customs Charges */}
                        {customsRows.length > 0 && (
                          <>
                            <tr className="estimate-section-row" style={{ backgroundColor: "#f0f2f5" }}>
                              <td colSpan={13}>
                                <strong>Customs Charges</strong>
                              </td>
                            </tr>
                            {customsRowsData.map(({ row, calc }) => renderRow(row, calc, setCustomsRows))}
                            <tr style={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
                              <td colSpan={7}>Total - Customs Charges</td>
                              <td>{formatValue(totalChangeRoeCustoms)}</td>
                              <td></td>
                              <td></td>
                              <td>{formatValue(totalCustomsDiscount)}</td>
                              <td>{formatValue(totalCustomsExclusive)}</td>
                              <td>{formatValue(totalCustomsVat)}</td>
                            </tr>
                          </>
                        )}

                        {/* Grand Total Row */}
                        <tr style={{ fontWeight: "bold", backgroundColor: "#e2e8f0", borderTop: "2px solid #475569" }}>
                          <td colSpan={7}>
                            <strong>GRAND TOTAL</strong>
                          </td>
                          <td>{formatValue(grandTotalFinalAmt)}</td>
                          <td></td>
                          <td></td>
                          <td>{formatValue(grandTotalDiscount)}</td>
                          <td>{formatValue(grandTotalExclusive)}</td>
                          <td>{formatValue(grandTotalVat)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* <div className="text-center mt-3">
                    <button className="ship_btn" onClick={estimateCalculate}>
                      Get Quote
                    </button>
                  </div> */}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
