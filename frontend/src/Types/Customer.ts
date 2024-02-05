export type CustomerType = {
        _id:string,
        ID:string,
        orderDate: string; // Date format: YYYY-MM-DD
        company: string; // Alphanumeric characters only
        owner: string; // Alphanumeric characters only
        Item: string; 
        quantity: number; // Integer value
        weight: number; // Float value
        requestForShipment: string;
        trackingID: string;
        shipmentSize: {
            length: number;
            breadth: number;
            height: number;
        }
        boxCount: number; // Integer value
        specification: string;
        checklistQuantity: string; 
}

export type CustomerState = {
Customer:CustomerType | null
}