export type WindcaveBodyType = {
  type: 'purchase'
  amount: string
  currency: 'NZD'
  merchantReference: string
  customer: {
    email: string
  }
  metaData: Array<string | null>,
  callbackUrls: {
    approved: string
    declined: string
    cancelled: string
  }
}

export type RawFormData = {
  name: string
  email: string
  phone: string | null
  amount: number
  reference: string
  comments: string | null
}


// <input
// type="text"
// id="full-name"
// name="name"
// placeholder="Full Name"
// required
// />
// <input type="text" id="email" placeholder="Email" name="email" required />
// <input type="text" id="phone" placeholder="Phone" name="phone" />
// <input type="text" id="amount" placeholder="Amount" name="amount" required />
// <p className="currency-label">NZD</p>
// <input
// type="text"
// id="reference"
// placeholder="Reference"
// name="reference"
// />
// <input
// type="text-field"
// id="comments"
// placeholder="Comments"
// name="comments"
// />


//  $request->setMerchantReference($MerchantReference);
//     $request->setAmountInput($AmountInput);
//     $request->setTxnData1($Phone);
//     $request->setTxnData2($Comments);
//     $request->setTxnData3($Name);
//     $request->setTxnType('Purchase');
//     $request->setCurrencyInput('NZD');
//     $request->setEmailAddress($email);
//     $request->setUrlFail($script_url); # can be a dedicated failure page
//     $request->setUrlSuccess('https://payments.crane-brothers.com/?good=1'); # can be a dedicated success page
//     $request->setTxnId($TxnId);