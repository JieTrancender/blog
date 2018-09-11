local tbl = {}

local classList = {}
local classBase = {}

function classBase:__init( args )
	-- body
end

-- 在继承链中寻找是否是clazz的子类
-- 类的原始基类是classBase
function classBase:isa( clazz )
	local c = classof(self)
	while c and c ~= classBase do
		if c == clazz then return true end
		c = superclassof(c)
	end

	return false
end

-- 在无父类时指定继承链末端为nil
local function new( clazz, ... )
	local obj = {}
	local mt = rawget(clazz, "_mt_")
	if not mt then
		mt = {
			__index = clazz,
			__tostring = clazz.__tostring,
			__gc = clazz.__gc,
		}
		rawset(clazz, "_mt_", mt)
	end

	setmetatable(obj, mt)
	obj:__init(...)

	return obj
end

function tbl.class( super, name )
	local clazz = {}
	if type(name) == "string" then
		local className = name .. '__'
		if classList[className] ~= nil then
			log("#############oo.class is hotfix update, class name is:", name)
			clazz = classList[className]
			for k, v in pairs(clazz) do
				clazz[k] = nil
			end
		else
			classList[className] = clazz
		end
	else
		error("Error:class name is not a string")
	end

	super = super or classBase
	setmetatable(clazz, {__index = super, __call = new})

	return clazz
end

function tbl.superclassof( clazz )
	return rawget(clazz, "__super")
end

function tbl.classof( obj )
	return getmetatable(obj).__index
end

function tbl.instanceof( obj, clazz )
	return ((obj.isa and obj:isa(clazz)) == true)
end

return tbl