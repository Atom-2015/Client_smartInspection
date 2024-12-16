import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  './billing.css'

function Billing() {
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);

  const openFeaturesModal = () => setIsFeaturesModalOpen(true);
  const closeFeaturesModal = () => setIsFeaturesModalOpen(false);

  return (
    <div className="container my-4" id='ankittt'>
      {/* Subscription Status Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-light shadow-sm">
            <div className="card-body bg-[#1e1e1e]" id='firstbill'>
              <h5 className="card-title text-white">Current Status</h5>
              <p className="card-text text-white">View your current billing details here</p>
              <hr />
              <p className="mb-1 text-white"><strong>Subscription Status:</strong> <span className="text-danger">Expired</span></p>
              <p className="mb-1 text-white"><strong>Expires:</strong> Sep 27, 2024</p>
              <p className="text-white"><strong>Image Usage:</strong> 468 / 1000</p>
              <small className="text-white">*Once your subscription expires, you'll need to renew it to regain access to inspections</small>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h5 className="text-2xl text-white">Future Land Service Plans</h5>
          <p className="text-md text-white">
            At <b>Future Land</b>, our goal is to provide measurable results that enhance our users' workflow. To maintain focus, we’ve chosen not to develop our own billing platform. Instead, we rely on Zoho Subscription, a trusted third-party billing solution that offers a secure customer portal where you can view invoices, payment history, and manage your Future Land subscription.
          </p>
        </div>
      </div>

      {/* Subscription Plans Section */}
      <div className="row">
        {/* Trial Card */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body bg-[#1e1e1e] box-billing">
              <h6 className="font-bold text-white">Trial</h6>
              <p className="text-white">FREE product trial period.</p>
              <hr />
              <p className="text-white"><strong>1 year access included</strong></p>
              <p className="text-white"><strong>1,000 images included</strong></p>
              <small className="text-white">Experience Future Land for two weeks with up to 1,000 images before upgrading to a subscription plan.</small>
              <button className="btn btn-primary btn-sm mt-2 text-white" disabled>Not Available</button>
            </div>
          </div>
        </div>
        
        {/* On-Demand Pricing Card */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body bg-[#1e1e1e]">
              <h6 className="font-bold text-white">On-Demand Pricing</h6>
              <p className="text-white">It’s straightforward: you pay a fixed rate per asset or image.</p>
              <hr />
              <p className="text-white"><strong>1 year access included</strong></p>
              <p className="text-white"><strong>Pay per asset or image uploaded</strong></p>
              <button className="btn btn-primary btn-sm mt-2">Activate Plan</button>
            </div>
          </div>
        </div>

        {/* Yearly Enterprise Subscription Card */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body bg-[#1e1e1e]">
              <h6 className="font-bold text-white">Yearly Enterprise Subscription</h6>
              <p className="text-white">For large amounts of data. You pay a tailor-made pricing plan.</p>
              <hr />
              <p className="text-white"><strong>1 year access included</strong></p>
              <p className="text-white"><strong>Automatic access renewal</strong></p>
              <button className="btn btn-secondary btn-sm mt-2">Contact Us</button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section Button */}
      <div className="row mt-4">
        <div className="col-md-12 text-center">
          <button onClick={openFeaturesModal} className="btn btn-primary btn-lg">View Features</button>
        </div>
      </div>

      {/* Features Modal */}
      {isFeaturesModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Features</h5>
                <button type="button" className="close" onClick={closeFeaturesModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table className="table-striped table text-dark w-100">
                  <thead>
                    <tr>
                      <th>Features</th>
                      <th>Trial</th>
                      <th>Pay As You Go</th>
                      <th>Yearly Enterprise Subscription</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Personalized Mapping</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                    </tr>
                    <tr>
                      <td>KML File Integration</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                    </tr>
                    <tr>
                      <td>Image Markup</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                    </tr>
                    <tr>
                      <td>Monthly Data Backup</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                    </tr>
                    <tr>
                      <td>Report Generation</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                      <td>&#10003;</td>
                    </tr>
                    <tr>
                      <td>No User Limit</td>
                      <td>&#10007;</td>
                      <td>&#10007;</td>
                      <td>&#10003;</td>
                    </tr>
                    <tr>
                      <td>User Permissions & Access Control</td>
                      <td>&#10007;</td>
                      <td>&#10007;</td>
                      <td>&#10003;</td>
                    </tr>
                    <tr>
                      <td>Branded Solution</td>
                      <td>&#10007;</td>
                      <td>&#10007;</td>
                      <td>&#10003;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeFeaturesModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;
