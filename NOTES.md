new is for a new instance of a specific model:

foo = Foo.new
build is for creating a new instance within an AR association:

bar = foo.build_bar  # (has_one or belongs_to)
or

bar = foo.bars.build # (has\_many, habtm or has_many :through)