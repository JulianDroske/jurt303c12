sql = require 'luasql.sqlite3'.sqlite3()
require 'jurl'

-- parse args
if arg[1] == nil or arg[2] == nil then
	print('Usage: $prog <database_path> <key>')
	os.exit(1);
end

path = arg[1]
key = arg[2]

db = sql:connect(path)
if db == nil then
	print('Load database error')
	os.exit(1)
end

function fix(str)
	return xorstr(str, key)
end

-- parse friends uin
cur = db:execute('SELECT name FROM FRIENDS')

rowcount = db:execute('SELECT count(name) FROM FRIENDS'):fetch()

for i=1,rowcount do
	uin_enc = cur:fetch()
	if uin_enc ~= nil then io.stdout:write(fix(uin_enc)..'\n') end
end

-- parse texts
-- get all friends

cur = db:execute('SELECT type,name FROM sqlite_master')

rowcount = db:execute('SELECT count(name) FROM FRIENDS'):fetch()

friends = {}

for i=1,rowcount do
	type,name = cur:fetch()
	if type == 'table' and name ~= nil and ( string.sub(name, 1, 9) == 'mr_friend' or string.sub(name, 1, 8) == 'mr_troop') then table.insert(friends, name) end
end

-- parse messages
for tmp,friend in pairs(friends) do
	cur = db:execute('SELECT msgData FROM '..friend)

	rowcount = db:execute('SELECT count(msgData) FROM '..friend):fetch()

	for i=1,rowcount do
		msg = cur:fetch()
		if uin_enc ~= nil then io.stdout:write(fix(msg)..'\n') end
	end
end

