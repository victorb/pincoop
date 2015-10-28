#! /bin/bash
set -e

echo "Preparing to pin content in cluster..."


TO_PIN=(
'QmSR7ELqgrwQEWkmDFLjeeMeZBcRpzV7K8G1j9yvJnWyH9'
'QmbWJCHaKEFULo5FmmQgZSppfET7yThk3erBdYaYtkDRmd'
'Qmc46FrUcsMUrpYEJrkKB9MmaXMeWJHGoqTL7MPReR3UYM'
'QmdCwW6WVqzDnEjWFSkztSNaxDSPQuWH4BEqFgc96iuoGC'
'QmdyWKUVgbkB6wuB6z6adGAUZ56eKCcJiB3N45dvA6K1hN'
'QmZrggXgBBzgwcSAMBsNchH354Mi9pZDAEQRHshbkUMeRM'
'QmURv1xdQvzgLunCoxoxsRPWmEbjitMCNajdDNK1fQA45d'
'QmZZpLbHxoaw4feXyXMWw9BbLxusY1aJ57foF8echmSELD'
'QmSG4JpZ9JUXivoFKVaUH7KXfeB75bfidR4n5qjwDbkqH7'
'QmWBYHF9xdFApjUCeHtJVeSzekMuuUmNcGQsASTrSk78JH'
'QmbWJCHaKEFULo5FmmQgZSppfET7yThk3erBdYaYtkDRmd'
'QmSR7ELqgrwQEWkmDFLjeeMeZBcRpzV7K8G1j9yvJnWyH9'
'QmS9YJvLe1E3CSzqiNViuJgKgKeXJv3uZLZmyyVeW7AQY7'
'Qmbv3xms1rUV9VQ8x49rhC3bNaWSpuzLSAtX1CWQZrTPyZ'
'QmWi9e7UWhJKPixsEshdVBZRZD4eh6nNXBNQ4emFfYoNTh'
'QmdMmVi6REUjP9zbFYCFxJWxaoV77L9iLQcBLda3q4Tyk1'
'QmRegQwX27Uexh8DQaczTrdwVn4gMdwFReNEBJcPhLRwcq'
'QmWjdqHX71vGWyxV68QzfXRcPzufbkYxhVDNxcj6mkkPYo'
'QmXcpG9ke5GJVzdcsoGddj5w5BifPq5cdFSU9znCPT9q9X'
'QmU62zXAeYaFm3XviFgb1BxNarzxLLYhK9bUAVBWLwngJV'
'QmNXSX68cHrHR5XmN4ZNmKm6qPRE39TyJqSBXdpbKtoJDH'
'QmNNsxvnvSgpCCWDAtnkvJ2CRi1taQGDWL3gAt9JzPSWX4'
'QmVFqqVw1iBwoVFA8PPTeN3FR6kkVWqmnthgKFiVDe3AVr'
'QmTmtDi6fYjaZ1N9AC3SB3VkqdAkCp6nCqS3nncSmzGXK6'
'QmfVBTXAFMua7JcHNkG2Bt5m5L2UPjMn9wiEFdxrnpdWjB'
'QmaTrmJeHvucKdtZN6ttb53vsUXSaLfocono4dFFMgJxCs'
'QmSNSm1gCv8mHjapPTQRuCJVWyabredCcUUnNDmp6pYrLs'
'QmUWgc1vokX7WJREe5tbe7bP1uQtdDiwHgRWQrLDNYip49'
'QmWAatTSa5CU3yzio15p47jGrwW4dPDfSHCkrLjFjPs75s'
'QmPXHtwCheXJ7fRFv9DTA3UaRHr59v1D4XrdR9KWa9HfR2'
'QmXeBjJ9gdJ1gQ8sXg1A6BNeL2fsmv5rPAq6uxj9hynsY4'
'QmdcdMwNVAi1jr1hwnKCnp3dJsHcaZyGgwWrEARTNMVeXd'
'QmazRLjjzLYDnxVMEMEmKd5w8KxYMyaQ3wMakLcz5iKyNc'
'QmchUpLRQxTTvdG75K9HxMRfdgQ1cbv2rHnorEbjkRrbXB'
'QmbkawJipe5MFVDtpCGrG75y59Ancq6UYSorHfoyGhUJ43'
'QmVu51NWMctz5MV1cLnR2SmUeYZy7nSVQiKHsLQ1fzDkzk'
'QmY6anJVKjChjxnjXdSZVGqKGoYmM1xgcLzkLT1613Sjw7'
);

# Debug
# HOST="localhost:3000"
# Production
HOST="openipfs.xyz"


for i in ${TO_PIN[@]}; do
  	RND_NUM=0.$[ 1 + $[ RANDOM % 100 ]]
	echo "Pinning $i in $RND_NUM"
	sleep $RND_NUM
	curl --silent -X POST http://$HOST/api/pin/$i > /dev/null
done

echo "Done pinning!"
