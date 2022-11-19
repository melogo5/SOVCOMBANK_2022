```shell
# pg_dump -U postgres --clean --if-exists sovcombank -O -x > ./db.sql
psql -U postgres -d sovcombank -f ./db.sql
```

### Разное
```sql
CREATE DATABASE sovcombank
WITH OWNER "postgres"
ENCODING 'UTF8'
  LC_COLLATE = 'ru_RU.UTF-8'
  LC_CTYPE = 'ru_RU.UTF-8'
TEMPLATE = template0;
```
