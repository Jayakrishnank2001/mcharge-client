export interface OwnerCount {
    label: string;
    value: number;
}

export interface StationCount{
  label: string;
  value: number;
}

export interface ParkingBooking {
  customer_id: number;
  customer_name: string;
  station_id: number;
  station_name: string;
  duration: string;
  start_datetime: string;
  end_datetime: string;
  parking_type: number;
  parking_type_name: string;
  booking_status: number;
  booking_status_name: string;
  total_amount: number;
  created_at: string;
}

