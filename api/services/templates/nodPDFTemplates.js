const bdcTemplate = (txn, user) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <style>
    html {
      zoom: 0.7;
    }
      .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }

      a {
        color: #ea348b;
        text-decoration: underline;
      }

      body {
        position: relative;
        width: 21cm;  
        height: 29.7cm; 
        margin: 0 auto; 
        color: #001028;
        background: #FFFFFF; 
        font-family: Arial, sans-serif; 
        font-size: 12px; 
        font-family: Arial;
      }

      header {
        padding: 10px 0;
        margin-bottom: 10px;
      }

      #logo {
        text-align: center;
        margin-bottom: 10px;
      }

      #logo img {
        width: 250px;
        margin-top: 20px;
        margin-bottom: 10px;
      }

      h1.logo {
        border-top: 1px solid  #5D6975;
        border-bottom: 1px solid  #5D6975;
        color: #5D6975;
        font-size: 2.4em;
        line-height: 1.4em;
        font-weight: normal;
        text-align: center;
        margin: 0 0 20px 0;
        
      }

      #project {
        float: left;
      }

      #project span {
        color: #5D6975;
        text-align: right;
        width: 52px;
        margin-right: 10px;
        display: inline-block;
        font-size: 0.8em;
      }

      #company {
        float: right;
        text-align: right;
      }

      #project div,
      #company div {
        white-space: nowrap;        
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 20px;
      }

      table tr:nth-child(2n-1) td {
        background: #F5F5F5;
      }

      table th,
      table td {
        text-align: center;
      }

      table .service,
      table .desc {
        text-align: left;
      }

      table td {
        padding: 10px;
        text-align: right;
      }

      table td.service,
      table td.desc {
        vertical-align: top;
      }

      table td.unit,
      table td.qty,
      table td.total {
        font-size: 1.2em;
        font-weight: bold;
      }

      table td.grand {
        border-top: 1px solid #5D6975;;
      }

      footer {
        color: #5D6975;
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #C1CED9;
        padding: 8px 0;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <header class="clearfix">
      <div id="logo" style="display: none;">
        <img  src="http://nodtransfer.com:8888/img/nodtransfer-logo.f717c691.svg">
      </div>
      <h1 class="logo">TINKERING BDC</h1>
      <div style="text-align:center">
        <h3>Powered by NodTransfer</h3>
        <h1>Foreign Exchange</h1>
        <h2>Exchange Details</h2>
      </div>
     
    </header>
    <main>
      <table>
       
        <tbody>
          <tr>
            <td class="service">Date</td>
            
            <td class="total">${txn.paid_at}</td>
          </tr>
          <tr>
            <td class="service">Operation</td>
            
            <td class="total">SELL ${txn.sender_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Status</td>
            
            <td class="total">${txn.status.toUpperCase()}</td>
          </tr>
          <tr>
            <td class="service">Payment Amount</td>
            
            <td class="total">${txn.sender_amount.formatted} </td>
          </tr>
          <tr>
            <td class="service">FEE</td>
            
            <td class="total">${txn.fee_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Total Payment Amount</td>
            
            <td class="total">${txn.amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Payout Amount</td>
           
            <td class="total">${txn.recipient_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Exchange Rate</td>
            <td class="total">1 ${txn.currency_code} = ${txn.exchange_rate} ${txn.recipient_amount.currency_code}</td>
          </tr>
          <tr>
            <td class="service">Payment Method</td>
            
            <td class="total">${txn.payment_method.toUpperCase()}</td>
          </tr>
          <tr>
            <td class="service">Payout Method</td>
            
            <td class="total">CASH</td>
          </tr>
          <tr>
            <td class="service">Customer Name</td>
            <td class="total">${txn.recipient_name.toUpperCase()}</td>
          </tr>
          <tr>
            <td class="service">Exchange Reference</td>
            <td class="total">${txn.reference}</td>
          </tr>
          
          <tr>
            <td colspan="2" class="grand total">
              <p style="display: none;">${user.name}</p>
              <p style="text-align:center;">Thank you for using NodTransfer</p>
            </td>
          </tr>
        </tbody>
      </table>
     
    </main>
    <footer>
      NodTransfer: 2 Adewale Taiwo Olajide Close, off Niyi Okunbi. 
      
      US: +1 862 781 0644

      UK: +44 2392 16 0536
      
      NG: +234 704 2629 950
    </footer>
  </body>
</html>
  `;

const cashPickupTemplate = (txn, user) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <style>
    html {
      zoom: 0.7;
    }
      .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }

      a {
        color: #ea348b;
        text-decoration: underline;
      }

      body {
        position: relative;
        width: 21cm;  
        height: 29.7cm; 
        margin: 0 auto; 
        color: #001028;
        background: #FFFFFF; 
        font-family: Arial, sans-serif; 
        font-size: 12px; 
        font-family: Arial;
      }

      header {
        padding: 10px 0;
        margin-bottom: 10px;
      }

      #logo {
        text-align: center;
        margin-bottom: 10px;
      }

      #logo img {
        width: 250px;
        margin-top: 20px;
        margin-bottom: 10px;
      }

      h1.logo {
        border-top: 1px solid  #5D6975;
        border-bottom: 1px solid  #5D6975;
        color: #5D6975;
        font-size: 2.4em;
        line-height: 1.4em;
        font-weight: normal;
        text-align: center;
        margin: 0 0 20px 0;
        
      }

      #project {
        float: left;
      }

      #project span {
        color: #5D6975;
        text-align: right;
        width: 52px;
        margin-right: 10px;
        display: inline-block;
        font-size: 0.8em;
      }

      #company {
        float: right;
        text-align: right;
      }

      #project div,
      #company div {
        white-space: nowrap;        
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 20px;
      }

      table tr:nth-child(2n-1) td {
        background: #F5F5F5;
      }

      table th,
      table td {
        text-align: center;
      }

      table .service,
      table .desc {
        text-align: left;
      }

      table td {
        padding: 10px;
        text-align: right;
      }

      table td.service,
      table td.desc {
        vertical-align: top;
      }

      table td.unit,
      table td.qty,
      table td.total {
        font-size: 1.2em;
        font-weight: bold;
      }

      table td.grand {
        border-top: 1px solid #5D6975;;
      }

      footer {
        color: #5D6975;
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #C1CED9;
        padding: 8px 0;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <header class="clearfix">
      <div id="logo">
        <img  src="http://nodtransfer.com:8888/img/nodtransfer-logo.f717c691.svg">
      </div>
      <h1 class="logo">CASH PICKUP</h1>
      <div style="text-align:center">
        <h3>Powered by NodTransfer</h3>
         
         
       </div>
      <div id="company" class="clearfix">
        <div>NodTransfer</div>
        <div>2 Adewale Taiwo Olajide Close, <br />Lekki, Lagos, Nigeria.</div>
        <div><a href="tel:+18627810644">US: +1 862 781 0644</a></div>
        <div><a href="tel:+442392160536">UK: +44 2392 16 0536</a></div>
        <div><a href="tel:+2347042629950">NG: +234 704 2629 950</a></div>
        <div><a href="mailto:support@nodtransfer.com">support@nodtransfer.com</a></div>
      </div>
      <div id="project">
        <div><span>TXN TYPE</span> Funds Transfer (Cash Pickup)</div>
        <div><span>CLIENT</span> ${user.name}</div>
        <div><span>LOCATION</span> ${user.address.city}, ${user.address.country}, ${user.address.country_iso_2}</div>
        <div><span>EMAIL</span> <a href="mailto:${user.email}">${user.email}</a></div>
        <div><span>TXN DATE</span> ${txn.paid_at}</div>
        <div><span>PRINT DATE</span> ${new Date().toISOString()}</div>
      </div>
      
    </header>
    <main>
      <h2 style="text-align:center">Transfer Details</h2>
      <table>
        
        <tbody>
          <tr>
            <td class="service">Date</td>
            <td class="total">${txn.paid_at}</td>
          </tr>
          <tr>
            <td class="service">Operation</td>
            <td class="total">TRANSFER ${txn.sender_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Status</td>
            <td class="total">${txn.status.toUpperCase()}</td>
          </tr>
          <tr>
            <td class="service">Payment Amount</td>
            <td class="total">${txn.sender_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Service Fee</td>
            <td class="total">${txn.fee_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Total Payment Amount</td>
            <td class="total">${txn.amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Exchange Rate</td>
            <td class="total">1 ${txn.currency_code} = ${txn.exchange_rate} ${txn.recipient_currency_code}</td>
          </tr>
          <tr>
            <td class="service">Payout Amount</td>
            <td class="total">${txn.recipient_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Payment Method</td>
            <td class="total">${txn.payment_method.toUpperCase()}</td>
          </tr>
          
          <tr>
            <td class="service">Recipient Name</td>
            <td class="total">${txn.recipient_name.toUpperCase()}</td>
          </tr>
          <tr>
            <td class="service">Tracking Code</td>
            <td class="total">${txn.tracking_code}</td>
          </tr>
          <tr>
            <td class="service">Transaction Reference</td>
            <td class="total">${txn.reference}</td>
          </tr>
          <tr>
            <td colspan="2" class="grand total">
              <p style="text-align:center;">Thank you for using NodTransfer</p>
            </td>
          </tr>
        </tbody>
      </table>
      
    </main>
    <footer>
      NodTransfer: 2 Adewale Taiwo Olajide Close, off Niyi Okunbi. 
      
      US: +1 862 781 0644

      UK: +44 2392 16 0536
      
      NG: +234 704 2629 950
    </footer>
  </body>
</html>
  `;

const bankTransferTemplate = (txn, user) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <style>
    html {
      zoom: 0.7;
    }
      .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }

      a {
        color: #ea348b;
        text-decoration: underline;
      }

      body {
        position: relative;
        width: 21cm;  
        height: 29.7cm; 
        margin: 0 auto; 
        color: #001028;
        background: #FFFFFF; 
        font-family: Arial, sans-serif; 
        font-size: 12px; 
        font-family: Arial;
      }

      header {
        padding: 10px 0;
        margin-bottom: 10px;
      }

      #logo {
        text-align: center;
        margin-bottom: 10px;
      }

      #logo img {
        width: 250px;
        margin-top: 20px;
        margin-bottom: 10px;
      }

      h1.logo {
        border-top: 1px solid  #5D6975;
        border-bottom: 1px solid  #5D6975;
        color: #5D6975;
        font-size: 2.4em;
        line-height: 1.4em;
        font-weight: normal;
        text-align: center;
        margin: 0 0 20px 0;
        
      }

      #project {
        float: left;
      }

      #project span {
        color: #5D6975;
        text-align: right;
        width: 52px;
        margin-right: 10px;
        display: inline-block;
        font-size: 0.8em;
      }

      #company {
        float: right;
        text-align: right;
      }

      #project div,
      #company div {
        white-space: nowrap;        
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 20px;
      }

      table tr:nth-child(2n-1) td {
        background: #F5F5F5;
      }

      table th,
      table td {
        text-align: center;
      }

      table .service,
      table .desc {
        text-align: left;
      }

      table td {
        padding: 10px;
        text-align: right;
      }

      table td.service,
      table td.desc {
        vertical-align: top;
      }

      table td.unit,
      table td.qty,
      table td.total {
        font-size: 1.2em;
        font-weight: bold;
      }

      table td.grand {
        border-top: 1px solid #5D6975;;
      }

      footer {
        color: #5D6975;
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #C1CED9;
        padding: 8px 0;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <header class="clearfix">
      <div id="logo">
        <img  src="http://nodtransfer.com:8888/img/nodtransfer-logo.f717c691.svg">
      </div>
      <h1 class="logo">BANK TRANSFER</h1>
      <div style="text-align:center">
        <h3>Powered by NodTransfer</h3>
         
         
       </div>
      <div id="company" class="clearfix">
        <div>NodTransfer</div>
        <div>2 Adewale Taiwo Olajide Close, <br />Lekki, Lagos, Nigeria.</div>
        <div><a href="tel:+18627810644">US: +1 862 781 0644</a></div>
        <div><a href="tel:+442392160536">UK: +44 2392 16 0536</a></div>
        <div><a href="tel:+2347042629950">NG: +234 704 2629 950</a></div>
        <div><a href="mailto:support@nodtransfer.com">support@nodtransfer.com</a></div>
      </div>
      <div id="project">
        <div><span>TXN TYPE</span> Funds Transfer (Bank Transfer)</div>
        <div><span>CLIENT</span> ${user.name}</div>
        <div><span>LOCATION</span> ${user.address.city}, ${user.address.country}, ${user.address.country_iso_2}</div>
        <div><span>EMAIL</span> <a href="mailto:${user.email}">${user.email}</a></div>
        <div><span>TXN DATE</span> ${txn.paid_at}</div>
        <div><span>PRINT DATE</span> ${new Date().toISOString()}</div>
      </div>
      
    </header>
    <main>
      <h2 style="text-align:center">Transfer Details</h2>
      <table>
        <tbody>
          <tr>
            <td class="service">Date</td>
            <td class="total">${txn.paid_at}</td>
          </tr>
          <tr>
            <td class="service">Operation</td>
            <td class="total">TRANSFER ${txn.sender_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Status</td>
            <td class="total">${txn.status.toUpperCase()}</td>
          </tr>
          <tr>
            <td class="service">Payment Amount</td>
            <td class="total">${txn.sender_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Service Fee</td>
            <td class="total">${txn.fee_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Total Payment Amount</td>
            <td class="total">${txn.amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Exchange Rate</td>
            <td class="total">1 {txn.currency_code} = ${txn.exchange_rate} ${txn.recipient_currency_code}</td>
          </tr>
          <tr>
            <td class="service">Payout Amount</td>
            <td class="total">${txn.recipient_amount.formatted}</td>
          </tr>
          <tr>
            <td class="service">Payment Method</td>
            <td class="total">${txn.payment_method}</td>
          </tr>
          <tr>
            <td class="service">Recipient Name</td>
            <td class="total">${txn.recipient_name.toUpperCase()}</td>
          </tr>
          <tr>
            <td class="service">Recipient Location</td>
            <td class="total">${txn.recipient_city.toUpperCase()}, ${txn.recipient_state.toUpperCase()}</td>
          </tr>
          <tr>
            <td class="service">Recipient Bank Name</td>
            <td class="total">${txn.recipient_bank_account_name}</td>
          </tr>
          <tr>
            <td class="service">Recipient Bank Account No</td>
            <td class="total">${txn.recipient_bank_account_number}</td>
          </tr>
          <tr>
            <td class="service">Transaction Reference</td>
            <td class="total">${txn.reference}</td>
          </tr>
          
          <tr>
            <td colspan="2" class="grand total">
              <p style="text-align:center;">Thank you for using NodTransfer</p>
            </td>
          </tr>
        </tbody>
      </table>
      
    </main>
    <footer>
      NodTransfer: 2 Adewale Taiwo Olajide Close, off Niyi Okunbi. 
      
      US: +1 862 781 0644

      UK: +44 2392 16 0536
      
      NG: +234 704 2629 950
    </footer>
  </body>
</html>
  `;

module.exports = { bdcTemplate, cashPickupTemplate, bankTransferTemplate };
