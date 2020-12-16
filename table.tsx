import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Button } from 'react-native';
import { Table, TableWrapper, Col, Cols, Cell } from 'react-native-table-component';

export default class MyTable extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    // Necessary so we can reset state on button click
    getInitialState() {
        const elementButton = (value) => (
            <TouchableOpacity onPress={() => this.selectPosition(value)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}></Text>
                </View>
            </TouchableOpacity>
        );

        return {
            turnHolder: "X",
            tableData: [
                [elementButton([0, 0]), elementButton([0, 1]), elementButton([0, 2])],
                [elementButton([1, 0]), elementButton([1, 1]), elementButton([1, 2])],
                [elementButton([2, 0]), elementButton([2, 1]), elementButton([2, 2])],
            ],
            winner: undefined,
        }
    }

    selectPosition(value) {
        let updatedTable = this.state.tableData;
        updatedTable[value[0]][value[1]] = this.state.turnHolder;
        this.setState({
            tableData: updatedTable
        })

        this.doWeHaveAWinner();

        if (this.state.turnHolder === "X") {
            this.setState({
                turnHolder: "O",
            })
        } else {
            this.setState({
                turnHolder: "X"
            })
        }
    }

    doWeHaveAWinner() {
        if(this.state.winner){
            return;
        };

        let table = this.state.tableData;
        // Checking horizontal and vertical wins
        for (let i = 0; i < table[0].length; i++) {
            if (table[i][0] === table[i][1] && table[i][0] === table[i][2]) {
                Alert.alert(`${this.state.turnHolder} wins!!`);
                this.setState({winner: this.state.turnHolder});
            }
            if (table[0][i] === table[1][i] && table[0][i] === table[2][i]) {
                Alert.alert(`${this.state.turnHolder} wins!!`);
                this.setState({winner: this.state.turnHolder});
            }
        }

        // Checking diagonal wins
        let mid = table[1][1];
        if ((mid === table[0][0] && mid === table[2][2]) || (mid === table[0][2] && mid === table[2][0])) {
            Alert.alert(`${this.state.turnHolder} wins!!`);
            this.setState({winner: this.state.turnHolder});
        }
    }

    resetState() {
        this.setState(this.getInitialState());
    }

    displayText(){
       return this.state.winner ? <Text>{this.state.winner} won!</Text> : <Text>It's {this.state.turnHolder}'s turn</Text>   
    }

    render() {
        return (
            <View style={styles.container}>
                {this.displayText()}
                <Table style={{ flexDirection: 'row' }} borderStyle={{ borderWidth: 1 }}>

                    <TableWrapper style={{ flex: 1 }}>
                        <Cols data={this.state.tableData} heightArr={[40, 40, 40]} textStyle={styles.symbol} />
                    </TableWrapper>
                </Table>

                <Button onPress={() => this.resetState()} title="Reset Game" />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    symbol: { textAlign: 'center', fontSize: 50 },
    btn: { width: 'auto', height: 'auto', paddingTop: 20 },
    btnText: { textAlign: 'center' },
});