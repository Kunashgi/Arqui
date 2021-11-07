from xmlrpc.server import SimpleXMLRPCServer


def add(data):
    return data*10

def main ():
    print("Server de procedimientos remotos")    
    server = SimpleXMLRPCServer(('192.168.1.123',9000))
    server.register_function(add)
    server.serve_forever()

if __name__ == '__main__':
     main()    