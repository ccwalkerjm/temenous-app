/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listCustomers = `query ListCustomers {
  listCustomers {
    id
    name
    phone
    balance
  }
}
`;
export const listVendors = `query ListVendors {
  listVendors {
    id
    Name
  }
}
`;
export const listTransactions = `query ListTransactions {
  listTransactions {
    id
    temenos_reference
    vendorId
    agentId
    customerId
    amount
    timeStarted
    timeCompleted
    type
    completed
  }
}
`;
