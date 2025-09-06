import React from 'react'
import '../components/css/Details.css'
import { usePDF } from 'react-to-pdf';
import { FaDownload } from 'react-icons/fa';
export default function ClearenceDtails() {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  return (
    <>
      <div className='container-fluid overflow-scroll' style={{ height: "88vh" }}>
        <div className='row bg-light rounded py-2 my-3'>
          <div className='col-11 d-flex justify-content-between'>
            <div>
              <p>Invoice</p>
            </div>
            <div>
              <FaDownload onClick={() => toPDF()} />
            </div>
          </div>
        </div>
        <div ref={targetRef}>
          <div className='row '>
            <div className='col'>

              <div style={{ margin: "auto", background: "#fafafa" }}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>
                        <table
                          style={{
                            marginTop: 10,
                            width: "100%",
                            borderBottom: "1px solid #2e2e2e24",
                            padding: 10
                          }}
                        >
                          <tbody>
                            <tr>
                              <td>
                                {" "}
                                <strong>Consignor/ Exporter details :</strong>
                              </td>
                              <td>
                                <p style={{ marginBottom: 5, marginTop: 0 }}>
                                  <strong>KKM Global Healthcare Group</strong>
                                </p>
                                <p style={{ marginBottom: 5, marginTop: 0 }}>
                                  1540 mark avenue
                                </p>
                                <p style={{ marginBottom: 5, marginTop: 0 }}>
                                  Gross point farms
                                </p>
                                <p style={{ marginBottom: 5, marginTop: 0 }}>0</p>
                                <p style={{ marginBottom: 5, marginTop: 5 }}>
                                  <strong>Telephone :</strong> <span>123456</span>
                                </p>
                                <p style={{ marginBottom: 5, marginTop: 5 }}>
                                  <strong>Email :</strong>
                                  <span>asiaDirect@gmail.com</span>
                                </p>
                              </td>
                              <td>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <strong> Means of Transport :</strong>
                                      </td>
                                      <td>
                                        <p style={{ margin: 5 }}>Road</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong> Transporter Details : </strong>
                                      </td>
                                      <td>
                                        <p>Dancliff Logistics</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <strong> ETD :</strong>
                                      </td>
                                      <td>
                                        <p>12/23/2022</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong> Loading point : </strong>
                                      </td>
                                      <td>Northriding, Johannesburg</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td style={{ textAlign: "right" }}>
                                <table style={{ width: "100%" }}>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <strong> Document :</strong>
                                      </td>
                                      <td>
                                        <p>QUO01171</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong> Date : </strong>
                                      </td>
                                      <td>12/3/2021</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table style={{ marginTop: 10, width: "100%" }}>
                          <tbody>
                            <tr>
                              <td>
                                {" "}
                                <strong>Consignee/ Importer details :</strong>
                              </td>
                              <td style={{ paddingLeft: 25 }}>
                                <p style={{ marginBottom: 5, marginTop: 0 }}>
                                  <strong>LEC Biotec</strong>
                                </p>
                                <p style={{ marginBottom: 5, marginTop: 0 }}>
                                  1540 mark avenue
                                </p>
                                <p style={{ marginBottom: 5, marginTop: 0 }}>
                                  Gross point farms
                                </p>
                                <p style={{ marginBottom: 5, marginTop: 0 }}>0</p>
                                <p style={{ marginBottom: 5, marginTop: 5 }}>
                                  <strong>Telephone :</strong> <span>123456</span>
                                </p>
                                <p style={{ marginBottom: 5, marginTop: 5 }}>
                                  <strong>Email :</strong>
                                  <span>asiaDirect@gmail.com</span>
                                </p>
                              </td>
                              <td>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <strong> Transport details :</strong>
                                      </td>
                                      <td style={{ width: 200 }}>
                                        <p style={{ margin: "5px 0px" }}>
                                          Truck reg: FN19FD GP Driver: Fortune Raradza
                                          (GN181896)
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong> Route :</strong>
                                      </td>
                                      <td style={{ margin: "5px 0px" }}>
                                        <p>Jhb SA - Beitbridge - Hre ZW</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong> Off Loading point :</strong>
                                      </td>
                                      <td>
                                        <p>Mt Pleasant, Harare</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong> Invoice currency : </strong>
                                      </td>
                                      <td>US Dollar (USD$)</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong> Base currency : </strong>
                                      </td>
                                      <td>ZW Dollar (ZW$)</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong> Quoted Rate : </strong>
                                      </td>
                                      <td>89.9</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td style={{ padding: "unset" }}>
                                <table style={{ width: "100%" }}>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <strong>Remark :</strong>
                                        <table
                                          style={{
                                            height: 130,
                                            border: "1px solid black",
                                            padding: 5,
                                            marginTop: 5,
                                            width: "100%"
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td style={{ padding: 5 }}>
                                                hello this product is not good
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div>
                          <table className="tebleAsia" style={{ marginTop: 10 }}>
                            <tbody>
                              <tr>
                                <th>item</th>
                                <th>HS/ Tariff Code</th>
                                <th>HS/ Tariff Description Summary</th>
                                <th>Product Description per Invoice</th>
                                <th>Document</th>
                                <th>Origin of goods</th>
                                <th>Goods Value</th>
                                <th>ATV</th>
                                <th> Value of Goods</th>
                                <th>Anti dumping %</th>
                                <th>Import Duty %</th>
                                <th>Sur tax %</th>
                                <th>Vat%</th>
                                <th>other %</th>
                                <th>Import Duty</th>
                                <th>Vat</th>
                                <th>Surtax</th>
                                <th>Other</th>
                                <th> Customs Amount due</th>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>12</td>
                                <td>ddsds</td>
                                <td>34</td>
                                <td>23432</td>
                                <td>324324324</td>
                                <td>34%</td>
                                <td>4354</td>
                                <td>34%</td>
                                <td>34%</td>
                                <td>34%</td>
                                <td>34%</td>
                                <td>45%</td>
                                <td>45%</td>
                                <td>45.12</td>
                                <td>45.12</td>
                                <td>45.12</td>
                                <td>45.12</td>
                                <td>4123</td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>  <td></td>
                                <td></td>

                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              {/* <tr>
                
                </tr> */}
                              {/* <tr>
                  <td>1</td>
                  <td>12</td>
                  <td>ddsds</td>
                  <td>34</td>
                  <td>23432</td>
                  <td>324324324</td>
                  <td>34%</td>
                  <td>4354</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>45%</td>
                  <td>45%</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>4123</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>12</td>
                  <td>ddsds</td>
                  <td>34</td>
                  <td>23432</td>
                  <td>324324324</td>
                  <td>34%</td>
                  <td>4354</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>45%</td>
                  <td>45%</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>4123</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>12</td>
                  <td>ddsds</td>
                  <td>34</td>
                  <td>23432</td>
                  <td>324324324</td>
                  <td>34%</td>
                  <td>4354</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>45%</td>
                  <td>45%</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>4123</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>12</td>
                  <td>ddsds</td>
                  <td>34</td>
                  <td>23432</td>
                  <td>324324324</td>
                  <td>34%</td>
                  <td>4354</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>45%</td>
                  <td>45%</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>4123</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>12</td>
                  <td>ddsds</td>
                  <td>34</td>
                  <td>23432</td>
                  <td>324324324</td>
                  <td>34%</td>
                  <td>4354</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>45%</td>
                  <td>45%</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>4123</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>12</td>
                  <td>ddsds</td>
                  <td>34</td>
                  <td>23432</td>
                  <td>324324324</td>
                  <td>34%</td>
                  <td>4354</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>45%</td>
                  <td>45%</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>4123</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>12</td>
                  <td>ddsds</td>
                  <td>34</td>
                  <td>23432</td>
                  <td>324324324</td>
                  <td>34%</td>
                  <td>4354</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>34%</td>
                  <td>45%</td>
                  <td>45%</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>45.12</td>
                  <td>4123</td>
                </tr> */}
                              <tr style={{ borderBottom: "unset" }}>
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ borderRight: "unset" }}>
                                  <strong>123454</strong>
                                </td>
                                <td style={{ borderRight: "unset" }}>
                                  <strong>123454</strong>
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>
                                  {" "}
                                  <strong>4123</strong>{" "}
                                </td>
                              </tr>
                              <tr style={{ borderLeft: "unset", borderBottom: "unset" }}>
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }}>
                                  {" "}
                                  <strong>Total</strong>{" "}
                                </td>
                                <td style={{ border: "unset" }} />
                                <td style={{ border: "unset" }}>
                                  {" "}
                                  <strong>4123d34</strong>{" "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table>
                            <tbody>
                              <tr>
                                <td style={{ width: "50%" }}>
                                  <p>
                                    {" "}
                                    <strong>Declaration by the exporter :</strong>{" "}
                                  </p>
                                  <p
                                    style={{
                                      border: "1px solid #030303",
                                      padding: 10,
                                      height: 70
                                    }}
                                  >
                                    The undersigned hereby declares that the above details are
                                    correct and all taxes arising on the basis of calculations
                                    above are correct.
                                  </p>
                                </td>
                                <td>
                                  <table style={{ textAlign: "right", width: "100%" }}>
                                    <tbody>
                                      <tr>
                                        <td style={{ width: "82%" }}>
                                          {" "}
                                          <strong>Page total:</strong>
                                        </td>
                                        <td>
                                          <strong>234324235345</strong>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              <tr>
                                <td>
                                  <p>
                                    {" "}
                                    <strong>Authorised Signature</strong>{" "}
                                  </p>
                                  <p
                                    style={{
                                      border: "1px solid #030303",
                                      padding: 10,
                                      height: 70
                                    }}
                                  >
                                    The undersigned hereby declares that the above details are
                                    correct and all taxes arising on the basis of calculations
                                    above are correct.
                                  </p>
                                </td>
                                <td>
                                  <table style={{ float: "right" }}>
                                    <tbody>
                                      <tr>
                                        <td style={{ paddingLeft: 20 }}>
                                          <p>
                                            <strong>Date signed:</strong>
                                          </p>
                                          <p> 234324235345</p>
                                        </td>
                                        <td style={{ paddingLeft: 20 }}>
                                          <p>
                                            <strong>Name:</strong>
                                          </p>
                                          <p> 234324235345</p>
                                        </td>
                                        <td style={{ paddingLeft: 20 }}>
                                          <p>
                                            <strong>Signature:</strong>
                                          </p>
                                          <p> 234324235345</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* 2nd table */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
