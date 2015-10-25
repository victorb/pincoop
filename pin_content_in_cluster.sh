#! /bin/bash
set -e

echo "Preparing to pin content in cluster..."

TO_PIN[1]="Qmc46FrUcsMUrpYEJrkKB9MmaXMeWJHGoqTL7MPReR3UYM"
TO_PIN[2]="QmdCwW6WVqzDnEjWFSkztSNaxDSPQuWH4BEqFgc96iuoGC"
TO_PIN[3]="QmdyWKUVgbkB6wuB6z6adGAUZ56eKCcJiB3N45dvA6K1hN"
TO_PIN[4]="QmZrggXgBBzgwcSAMBsNchH354Mi9pZDAEQRHshbkUMeRM"
TO_PIN[5]="QmURv1xdQvzgLunCoxoxsRPWmEbjitMCNajdDNK1fQA45d"
TO_PIN[6]="QmZZpLbHxoaw4feXyXMWw9BbLxusY1aJ57foF8echmSELD"
TO_PIN[7]="QmSG4JpZ9JUXivoFKVaUH7KXfeB75bfidR4n5qjwDbkqH7"
TO_PIN[8]="QmWBYHF9xdFApjUCeHtJVeSzekMuuUmNcGQsASTrSk78JH"
TO_PIN[9]="QmbWJCHaKEFULo5FmmQgZSppfET7yThk3erBdYaYtkDRmd"
TO_PIN[10]="QmSR7ELqgrwQEWkmDFLjeeMeZBcRpzV7K8G1j9yvJnWyH9"


for i in ${TO_PIN[@]}; do
	echo "Pinning $i"
	curl --silent -X POST http://localhost:3000/api/pin/$i > /dev/null
	sleep 0.3
done

echo "Done pinning!"
