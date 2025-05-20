import json

# Load and pretty-print a JSON file
with open('pasternak-work.json', 'r') as infile:
    data = json.load(infile)

# Write formatted JSON to a new file
with open('formatted_output.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)

print("JSON has been reformatted and saved as 'formatted_output.json'")
