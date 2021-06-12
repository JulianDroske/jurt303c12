function xor(n1, n2)
	local tmp1 = n1
	local tmp2 = n2
	local str = ''
	repeat
		local s1 = tmp1 % 2
		local s2 = tmp2 % 2
		if s1 == s2 then
			str = '0'..str
		else
			str = '1'..str
		end
		tmp1 = math.modf(tmp1/2)
		tmp2 = math.modf(tmp2/2)
	until(tmp1 == 0 and tmp2 == 0)
	return tonumber(str,2)
end

function str2table(str)
	local t={}
	str:gsub('.', function(c) table.insert(t, c) end)
	return t
end

function xorstr(str, key)
	local keyn = #key
	local fnstr = '';
	local str1 = str2table(str)
	local key1 = str2table(key)
	for i=0,#str-1 do
		fnstr = fnstr..string.char(xor(str1[i+1]:byte(), key1[i%keyn+1]:byte()))
	end
	return fnstr
end



