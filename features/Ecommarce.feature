Feature: Ecommerce validations

Scenario: Placing the order
Given a login to Ecommerce application with "mrahmanz@yahoo.com" and "Psqrt1965?"
When Add "ADIDAS ORIGINAL" to cart
Then Verify "ADIDAS ORIGINAL" is displayed in the cart
When Enter valid details and place the order 
Then Verify order in present in the orderHistory 
