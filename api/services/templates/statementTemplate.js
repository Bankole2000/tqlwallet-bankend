module.exports = (statement, user) => {
  let totalCredit = 0, totalDebit = 0;
  let statementHtml = ``;
  statement.forEach(txn => {
    statementHtml += `
    <tr>
          <td class="service ${txn.type.toLowerCase()}">${txn.type.toUpperCase()}</td>
          <td class="desc">${txn.description}</td>
          <td class="unit">&#8358; ${txn.amount}</td>
          
          <td class="total">${txn.createdAt}</td>
        </tr>
    `
    if (txn.type.toLowerCase() === 'credit') {
      totalCredit += txn.amount;
    } else {
      totalDebit += txn.amount;
    }
  });

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${user.firstname} ${user.lastname}'s Account statement</title>
    
    <style>
    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }
    
    a {
      color: #5D6975;
      text-decoration: underline;
    }
    
    body {
      position: relative;
      width: 8.26in;  
      height: 11.69in; 
      margin: 0 auto; 
      color: #001028;
      background: #FFFFFF; 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      font-family: Arial;
    }
    
    header {
      padding: 10px 0;
      margin-bottom: 30px;
    }
    
    #logo {
      text-align: center;
      margin-bottom: 10px;
    }
    
    #logo img {
      width: 90px;
    }
    
    .title {
      
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
    
    table th {
      padding: 5px 20px;
      color: #5D6975;
      border-bottom: 1px solid #C1CED9;
      white-space: nowrap;        
      font-weight: normal;
    }
    
    table .service,
    table .desc {
      text-align: left;
    }
    .credit {
      color: green;
      font-weight: bold;
    }
    .debit {
      color: red;
      font-weight: bold;
    }
    table td {
      padding: 20px;
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
    }
    
    table td.grand {
      border-top: 1px solid #5D6975;;
    }
    
    #notices .notice {
      color: #5D6975;
      font-size: 1.2em;
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
        <img src="https://bankole2000.github.io/tqlwallet/img/logo.5d05932e.png">
        <h2>Wallet App</h2>
      </div>
     
      <h1 style="text-align: center">Account Statement</h1>
      <hr />
      <div id="company" class="clearfix">
        <div>Wallet App</div>
        <div>No 999 Some street,<br /> ABJ 900104, NG</div>
        <div>+234(0)801-234-5678</div>
        <div><a href="mailto:company@example.com">company@example.com</a></div>
      </div>
      <div id="project">
        
        <div><span>ACCOUNT</span> ${user.firstname} $${user.lastname}</div>
        <div><span>ADDRESS</span> ${user.city}, ${user.state} ${user.zipCode}, ${user.country}</div>
        <div><span>EMAIL</span><a href="mailto:${user.emil}">${user.email}</a></div>
        <div><span>DATE</span>${new Date().toDateString()}</div>
        
      </div>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th class="service">TXN TYPE</th>
            <th class="desc">DESCRIPTION</th>
            <th>AMOUNT</th>
            
            <th>TIME</th>
          </tr>
        </thead>
        <tbody>
          ${statementHtml}
          <tr>
            <td colspan="3">TOTAL CREDIT</td>
            <td class="total credit">&#8358; ${totalCredit}</td>
          </tr>
          <tr>
            <td colspan="3">TOTAL DEBIT</td>
            <td class="total debit">&#8358; ${totalDebit}</td>
          </tr>
          <tr>
            <td colspan="3" class="grand total">CURRENT WALLET BALANCE</td>
            <td class="grand total">&#8358; ${user.balance}</td>
          </tr>
        </tbody>
      </table>
      <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">Any important information (like transaction charges etc) may be put here.</div>
      </div>
    </main>
    <footer>
      Thank you for using <a href="https://bankole2000.github.io/tqlwallet">Wallet app</a>
    </footer>
  </body>
</html>
  `
}