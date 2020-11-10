param (
    [switch]$stop = $false
)

$project_path = Get-Location
$api_filename = "apiv1.yaml"
$port = 8081

docker run -d -p 8081:8080 -e SWAGGER_JSON=/project/$api_filename -v $project_path\:/project swaggerapi/swagger-editor
# if($stop){
#     Write-Output 'Stopping docker container swedit'
#     docker container stop swedit >$null 2>&1
#     exit
# }

# Write-Output 'Starting docker container swedit'
# $runRes = docker container start swedit
# if ($runRes -ne $null) {
#     Write-Output 'OK, opening browser'
#     start "http://localhost:$port"
#     exit
# }
# else {
#     Write-Output 'Error: container not found'
#     Write-Output 'Create new container swedit and run it'
#     docker run --name swedit -d -p 8081:8080 -e SWAGGER_JSON=/project/apiv1.yaml -v $project_path\:/project swaggerapi/swagger-editor
#     start "http://localhost:$port"
#     exit
# }