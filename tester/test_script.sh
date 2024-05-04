#!/bin/bash

echo "Login and get JWT token"

account_base_url="${ACCOUNT_SERVICE_URL}:${ACCOUNT_SERVICE_PORT}"
echo $account_base_url


stats_base_url="${STATS_SERVICE_URL}:${STATS_SERVICE_PORT}"
echo $stats_base_url


login_response=$(curl -s -X POST "${account_base_url}/auth/login" \
-H "Content-Type: application/json" \
-d '{"username": "admin", "password": "password"}')

echo "Extract token from the login response"
token=$(echo $login_response | jq -r '.token')


declare -a records=(
    '{"name": "Abhishek", "salary": "145000", "currency": "USD", "department": "Engineering", "sub_department": "Platform"}'
    '{"name": "Anurag", "salary": "90000", "currency": "USD", "department": "Banking", "on_contract": "true", "sub_department": "Loan"}'
    '{"name": "Himani", "salary": "240000", "currency": "USD", "department": "Engineering", "sub_department": "Platform"}'
    '{"name": "Yatendra", "salary": "30", "currency": "USD", "department": "Operations", "sub_department": "CustomerOnboarding"}'
    '{"name": "Ragini", "salary": "30", "currency": "USD", "department": "Engineering", "sub_department": "Platform"}'
    '{"name": "Nikhil", "salary": "110000", "currency": "USD", "on_contract": "true", "department": "Engineering", "sub_department": "Platform"}'
    '{"name": "Guljit", "salary": "30", "currency": "USD", "department": "Administration", "sub_department": "Agriculture"}'
    '{"name": "Himanshu", "salary": "70000", "currency": "EUR", "department": "Operations", "sub_department": "CustomerOnboarding"}'
    '{"name": "Anupam", "salary": "200000000", "currency": "INR", "department": "Engineering", "sub_department": "Platform"}'
)


for record in "${records[@]}"; do
    echo "adding record: ${record}"
    resp=$(curl -s -X POST "${stats_base_url}/api/records" \
    -H "Authorization: Bearer $token" \
    -H "Content-Type: application/json" \
    -d "$record")
    echo $resp
done


echo "test stats API:"
curl -s -X GET "${stats_base_url}/api/stats" -H "Authorization: Bearer $token"
echo -e "\n ---"


echo "test stats/contract"
curl -s -X GET "${stats_base_url}/api/stats/contract" -H "Authorization: Bearer $token"
echo -e "\n ---"

echo "test stats/departments"
curl -s -X GET "${stats_base_url}/api/stats/departments" -H "Authorization: Bearer $token"
echo -e "\n ---"

echo "test stats/departments/subdepartments"
curl -s -X GET "${stats_base_url}/api/stats/departments/subdepartments" -H "Authorization: Bearer $token"
echo -e "\n ---"
