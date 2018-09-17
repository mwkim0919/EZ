# Tables

## User
- id
- email
- password
- role
- create_datetime
- last_login_datetime


## Transaction
- id
- category_id
- user_id 
- description
- withdraw
- deposit
- transaction_datetime
- create_datetime

## Category
- id
- user_id
- parent_category_id
- name
- limit
- create_datetime

## Schedule
- id
- user_id
- description
- amount
- start_date
- recurring_pattern (ENUM)
- create_datetime
