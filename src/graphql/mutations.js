/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const registerCustomer = `mutation RegisterCustomer($name: String, $phone: String) {
  registerCustomer(name: $name, phone: $phone) {
    id
    name
    phone
    balance
  }
}
`;
export const login = `mutation Login($phone: String) {
  login(phone: $phone) {
    id
    name
    phone
    balance
  }
}
`;
export const initTransaction = `mutation InitTransaction($input: inputTransaction) {
  initTransaction(input: $input) {
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
export const completeTransaction = `mutation CompleteTransaction($id: ID) {
  completeTransaction(id: $id) {
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
