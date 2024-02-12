import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



const ViewAllAngpao = () => {
    const [angpaoList, setAngpaoList] = useState(JSON.parse(localStorage.getItem('CNY')).angpao);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortedList, setSortedList] = useState([...angpaoList]);
    const [sortConfig, setSortConfig] = useState({ key: 'dateReceived', direction: 'ascending' });


    const calculateTotal = (sorted) => {
      return parseFloat(sorted.reduce((total, angpao) => total + parseFloat(angpao.amount), 0)).toFixed(2);
    };


    useEffect(() => {
        let sortedAngpaos = [...angpaoList];
        if (searchTerm) {
        sortedAngpaos = sortedAngpaos.filter(angpao =>
            angpao.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            angpao.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            angpao.use.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      sortedAngpaos.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
          });
          setSortedList(sortedAngpaos);
    }, [searchTerm, angpaoList, sortConfig]);

    const ViewAngpao = (angpao) => {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              {/* <img src={`data:image/png;base64,${angpao.imageUrl}`} className="max-w-xs max-h-64 rounded-md" alt="Uploaded Image"/> */}
            </DialogContent>
          </Dialog>
        )
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    return (
      <div className="w-full">

        <div className="flex mb-4">
           <input
             type="text"
             className="p-1 rounded-lg border-2 border-gray-300 shadow-md"
             placeholder="Search..."
             value={searchTerm}
             onChange={handleSearch}
           />
         </div>
         {
            sortedList.length > 0 ? (
              <Table>
                <TableCaption>A list of your Angpaos.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px] md:w-[500px]" onClick={() => handleSort('recipient')}>From</TableHead>
                    <TableHead className="w-[140px]" onClick={() => handleSort('dateReceived')}>Date Received</TableHead>
                    <TableHead className="w-[120px]" onClick={() => handleSort('category')}>Category</TableHead>
                    <TableHead className="w-[120px]" onClick={() => handleSort('use')}>Use</TableHead>
                    <TableHead className="text-right w-[120px]" onClick={() => handleSort('amount')}>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedList.map((angpao) => (
                    <TableRow key={angpao.id}>
                      <TableCell className="font-medium">{angpao.from}</TableCell>
                      <TableCell>{angpao.date}</TableCell>
                      <TableCell>{angpao.category}</TableCell>
                      <TableCell>{angpao.use}</TableCell>
                      <TableCell className="text-right">{angpao.amount}</TableCell>
                      <TableCell className="text-right">
                        <ViewAngpao angpao={angpao} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>Total</TableCell>
                    <TableCell className="text-right">${calculateTotal(sortedList)}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            ) : (
              <p className="text-gray-500 text-xl">No angpao found.</p>
            )

         }
            
         
        
        
      </div>
      
  );
}
  
export default ViewAllAngpao;