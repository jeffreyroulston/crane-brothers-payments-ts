import Image from "next/image";


export default function Home() {
  return (
    <div className="body-wrapper">
      <Image className="logo" src='/crane-logo.png' alt="Crane Brothers Logo" width={800} height={84} />
      {/* <img className="logo" src="./app/crane-logo.png" /> */}
      <a className="back-button" href="https://crane-brothers.com">Back to crane-brothers.com</a>
      <h1>Payment</h1>
      <div className="payment-wrapper">
        <div className="left-side">
          <div className="bank-transfer">
            <h2>Direct bank transfers</h2>
            <div className="bank-transfers">
              <p>New Zealand</p>
              <p>Crane Brothers</p>
              <p>ASB Bank</p>
              <p>A/C 12-3109-0055367-00</p>
              <p>We accept Wepay and Alipay instore.</p>
              <p>Please provide a reference number when paying online</p>
            </div>
          </div>
        </div>
        <div className="right-side">
          <h2>Make a Credit Card payment</h2>

          <form method="post" className="payment-form">
            <input
              type="text"
              id="full-name"
              name="Name"
              placeholder="Full Name"
            />
            <input type="text" id="full-name" placeholder="Email" name="Email" />
            <input type="text" id="full-name" placeholder="Phone" name="Phone" />
            <input type="text" id="full-name" placeholder="Amount" name="Amount" />
            <p className="currency-label">NZD</p>
            <input
              type="text"
              id="full-name"

              placeholder="Reference"
              name="Reference"
            />
            <input
              type="text-field"
              id="full-name"

              placeholder="Comments"
            />
            <input
              name="Submit"
              type="submit"
              value="Submit"
              className="form-submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
