import json

# Load formatted JSON file
with open('formatted_output.json', 'r') as infile:
    data = json.load(infile)

# Save as minified JSON
with open('pasternak-work.json', 'w') as outfile:
    json.dump(data, outfile, separators=(',', ':'))

print("Minified JSON saved as 'pasternak-work.json'")
