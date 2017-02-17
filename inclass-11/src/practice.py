import math
#Minimum Depth of a heap
#(input is represented as list from left to right, top to bottom)
def minimum(tree):
	num = len(tree)
	result = math.floor(math.log((num+1), 2))
	return result
def heap(input):
    num = len(input)
    print range(int(math.floor(num/2)),0, -1)
    for i in range(int(math.floor(num/2)),0, -1):
    	print "i=", i
        l = 2*i
        r = 2*i + 1
        if r <= num:
        	if input[i-1] < input[r-1]:
        		print "i is", input[i-1], "right is", input[r-1]
           		a = float(input[i-1])
            	b = float(input[r-1])
            	input[i-1] = b
            	input[r-1] = a
            	print input
        if l<= num:
        	print "yes"
        	print "i is", input[i-1], "left is", input[l-1]
        	if input[i-1] < input[l-1]:
        		print "here"
         		a = float(input[i-1])
            	b = float(input[l-1])
            	input[i-1] = b
     			input[l-1] = a
            	print "no"
    return input
                  
def heapsort(input):
    result = []
    while input!= []:
        input = heap(input)
        k = input.pop(0)
        result.append(k)
    return result
                          
print heap([1,9,6,5,1000,8,10])