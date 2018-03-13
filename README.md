# Impuesto

Microservicio serverless generado en AWS Lambda, AWS Batch con uso de Node JS y DynamoDB:

Se requiere una tabla en dynamodb que registre los siguientes atributos

ID

created

impuesto

total

Para consultar mediante postman o curl:

curl -X GET "https://lrdn4dblvb.execute-api.us-west-1.amazonaws.com/prod/impuesto"

La compra y calculo acumulado de impuestos se registra automaticamente por cada compra resgistrada en facturación:

