
if arg[1] == nil then
	print('Invalid argments.\nUsage: '..arg[0]..' <file> [datalen=0]') os.exit(1)
end

if arg[2] == nil then datalen = -1 else datalen = tonumber(arg[2]) end

file = io.open(arg[1],'rb')
dat=''
if datalen <= 0 then dat=file:read(0) else
	for i=1,datalen do dat=dat..file:read(1) end
end
io.stdout:write(dat)
file:close()
os.exit(0)
