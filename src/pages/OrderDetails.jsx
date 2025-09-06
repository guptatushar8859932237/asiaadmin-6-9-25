import React from "react";
import { useLocation } from "react-router-dom";
export default function MAnageFreightDetails() {
  const infolocation = useLocation();
  const info = infolocation?.state?.data[0];
  console.log(infolocation?.state?.data[0]);

  return (
    <div className="wpWrapper">
      <div className="container">
        <div className="formDetails">
          <div className="row">
            <div className="col-lg-12">
              <h4 className="empyDetailHead">Admin Freight Details</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="">Freight Number</label>
              <input
                className="form-control det_input"
                value={info.freight_number}
                placeholder={1}
                readOnly=""
              />
            </div>
            <div className="col">
              <label htmlFor="">Product Description</label>
              <input
                type="text"
                className="form-control det_input"
                placeholder="xyz"
                readOnly=""
                value={info.product_desc}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label> Freight</label>
              <input
                placeholder="LCL"
                className="form-control det_input"
                value={info.freight}
                readOnly=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label> Freight Type</label>
              <input
                className="form-control"
                value={info.freight_type}
                readOnly=""
              />
            </div>

            <div className="col">
              <label htmlFor="">Dimension</label>
              <input
                placeholder={5}
                value={info.dimension}
                className="form-control"
                readOnly=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Weight</label>
              <input
                placeholder={5}
                className="form-control det_input"
                value={info.weight}
                readOnly=""
              />
            </div>
            <div className="col">
              <label htmlFor="">Comment</label>
              <input
                placeholder=""
                value={info.comment}
                className="form-control det_input"
                readOnly=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Shipment Description</label>
              <input
                value={info.shipment_des}
                className="form-control det_input"
                readOnly=""
              />
            </div>
          </div>
          <div className="horizontalLine"></div>
          <div className="row">
            <div className="col">
              <label htmlFor="">No. of Packages</label>
              <input
                placeholder={12}
                value={info.no_of_packages}
                className="form-control"
                readOnly=""
              />
            </div>
            <div className="col">
              <label htmlFor="">Package Type</label>
              <input
                placeholder="package type"
                className="form-control"
                readOnly=""
                value={info.package_type}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="">Shipment Origin</label>
              <input
                placeholder="shipment_origin"
                value={info.shipment_origin}
                className="form-control det_input"
                readOnly=""
              />
            </div>
            <div className="col">
              <label htmlFor="">User Type</label>
              <input
                placeholder="user_type"
                value={info.user_type}
                className="form-control det_input"
                readOnly=""
              />
            </div>
            <div className="col">
              <label>Shipment Ref</label>
              <input
                value={info?.shipment_ref}
                className="form-control det_input"
                readOnly=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Sea Freight Option</label>
              <input
                value={info.sea_freight_option}
                className="form-control det_input"
                readOnly=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Supplier Address</label>
              <input
                placeholder="supplier address"
                className="form-control"
                readOnly=""
                value={info.supplier_address}
              />
            </div>
            <div className="col">
              <label htmlFor="">Port of Loading</label>
              <input
                placeholder="port of loading"
                className="form-control"
                readOnly=""
                value={info.port_of_loading}
              />
            </div>
            <div className="col">
              <label>Port of Discharge</label>
              <input
                placeholder="post of discharge"
                className="form-control"
                readOnly=""
                value={info.post_of_discharge}
              />
            </div>
          </div>
          <div className="horizontalLine" />
          <div className="row">
            <div className="col">
              <label htmlFor="">Place of Delivery</label>
              <input
                placeholder="place of delivery"
                className="form-control det_input"
                readOnly=""
                value={info.place_of_delivery}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Ready for Collection</label>
              <input
                placeholder="ready for collection"
                className="form-control det_input"
                readOnly=""
                value={info.ready_for_collection}
              />
            </div>
            <div className="col">
              <label>Road Freight Option</label>
              <input
                placeholder={123}
                value={info.road_freight_option}
                className="form-control det_input"
                readOnly=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Loading Frequency</label>
              <input
                placeholder={12}
                value={info.loading_frequency}
                className="form-control"
                readOnly=""
              />
            </div>
            <div className="col">
              <label htmlFor="">Transit Time</label>
              <input
                placeholder="12ns"
                value={info.transit_time}
                className="form-control"
                readOnly=""
              />
            </div>
          </div>
          <div className="horizontalLine" />
        </div>
      </div>
    </div>
  );
}
