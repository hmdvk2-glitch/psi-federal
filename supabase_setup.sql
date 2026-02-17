-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Admins Table
create table if not exists admins (
  id uuid primary key default uuid_generate_v4(),
  role text not null,
  name text not null,
  email text unique not null,
  password text not null, -- Note: In a real production app, hash this!
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Customers Table
create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  "accountNumber" text unique not null,
  "fullName" text not null,
  email text unique not null,
  password text not null,
  balance numeric default 0,
  status text default 'active',
  photo text,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Transactions Table
create table if not exists transactions (
  id uuid primary key default uuid_generate_v4(),
  "customerId" uuid references customers(id),
  type text not null,
  amount numeric not null,
  description text,
  "chargesApplied" numeric default 0,
  status text default 'completed',
  date timestamp with time zone default timezone('utc'::text, now()),
  "senderName" text,
  "senderAccount" text,
  "transactionId" text unique not null,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Transfer Codes Table
create table if not exists "transferCodes" (
  id uuid primary key default uuid_generate_v4(),
  cot text,
  tax text,
  irs text,
  "updatedBy" text,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table admins enable row level security;
alter table customers enable row level security;
alter table transactions enable row level security;
alter table "transferCodes" enable row level security;

-- Create Policies (Simplified for Simulation - Allow All for now, or restrict)
-- For this simulation where everyone is an "admin" or "customer", we might want permissive policies 
-- or specific ones. For now, we'll allow public access to facilitate the demo flow, 
-- but in production you MUST lock this down.

create policy "Allow public access to admins" on admins for all using (true);
create policy "Allow public access to customers" on customers for all using (true);
create policy "Allow public access to transactions" on transactions for all using (true);
create policy "Allow public access to transferCodes" on "transferCodes" for all using (true);
