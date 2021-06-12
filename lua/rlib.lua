if(not arg[2])
then
	print('At least 2 arguments should be given\n')
	print('Usage: script [libpath] [function] [args...]')
	os.exit()
end

FUNC = package.loadlib(arg[1],arg[2])
if(not FUNC)
then
	print('Load library error.')
	os.exit()
end

FUNC = assert(FUNC)
print('Function name: '..arg[1])
args = table.unpack({...},3)
if(args) then print('Args: '..args) end

print()
FUNC(args)
